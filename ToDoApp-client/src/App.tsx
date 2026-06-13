import { useEffect, useState } from "react";
import type { ToDoItem } from "./models/ToDoItem";

import { getTodos } from "./services/ToDoApi";
import { createTask } from "./services/ToDoApi";
import { updateTask } from "./services/ToDoApi";
import { deleteTask } from "./services/ToDoApi";

import appIcon from "./assets/images/graphic4.png";

import TodoTable from "./components/ToDoTable";
import Tabs from "./components/Tabs";
import TodoModal from "./components/ToDoModal";

function App() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [activeTab, setActiveTab] = useState<"todo" | "done">("todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState<ToDoItem | null>(null);
  const [sortField, setSortField] = useState<"deadline" | "priority" | null>(
    "deadline",
  );

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  async function handleCreateToDo(todo: {
    title: string;
    notes: string;
    priority: string;
    deadline: string;
  }) {
    await createTask(todo);

    const updatedTodos = await getTodos();

    setTodos(updatedTodos);
  }

  async function handleToggleCompleted(todo: ToDoItem) {
    await updateTask(todo.id, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });

    const updatedTodos = await getTodos();

    setTodos(updatedTodos);
  }

  async function handleSaveToDo(todo: ToDoItem) {
    await updateTask(todo.id, todo);

    const updatedTodos = await getTodos();

    setTodos(updatedTodos);
  }

  async function handleDeleteToDo(id: number) {
    await deleteTask(id);

    const updatedTodos = await getTodos();

    setTodos(updatedTodos);

    setSelectedToDo(null);

    setIsModalOpen(false);
  }

  function handleEditToDo(todo: ToDoItem) {
    setSelectedToDo(todo);
    setIsModalOpen(true);
  }

  function handleSort(field: "deadline" | "priority") {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos();

        console.log(data);

        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTodos();
  }, []);

  const filteredTodos =
    activeTab === "todo"
      ? todos.filter((x) => !x.isCompleted)
      : todos.filter((x) => x.isCompleted);

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!sortField) return 0;

    let result = 0;

    if (sortField === "deadline") {
      result = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }

    if (sortField === "priority") {
      const priorityValue = {
        Low: 1,
        Medium: 2,
        High: 3,
      };

      result =
        priorityValue[a.priority as keyof typeof priorityValue] -
        priorityValue[b.priority as keyof typeof priorityValue];
    }

    return sortDirection === "asc" ? result : -result;
  });

  return (
    <div className="win98-window">
      <div className="win98-titlebar">
        <div className="titlebar-text">
          <img src={appIcon} alt="ToDo.98" />
          <span> ToDo.98</span>
        </div>

        <div>
          <button>_</button>
          <button>□</button>
          <button>X</button>
        </div>
      </div>

      <div className="win98-content">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        <div className="main-panel">
          <div className="table-container">
            <TodoTable
              todos={sortedTodos}
              onToggleCompleted={handleToggleCompleted}
              onSelectToDo={setSelectedToDo}
              onEditToDo={handleEditToDo}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>

          <TodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            toDo={selectedToDo}
            onCreate={handleCreateToDo}
            onUpdate={handleSaveToDo}
            onDelete={handleDeleteToDo}
          />

          <div className="panel-actions">
            <button
              onClick={() => {
                setSelectedToDo(null);
                setIsModalOpen(true);
              }}
            >
              New Task
            </button>

            <button
              disabled={!selectedToDo}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
