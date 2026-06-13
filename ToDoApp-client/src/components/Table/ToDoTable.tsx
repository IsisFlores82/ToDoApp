import type { ToDoItem } from "../../models/ToDoItem";

interface ToDoTableProps {
  todos: ToDoItem[];
  onToggleCompleted: (todo: ToDoItem) => void;
  onSelectToDo: (todo: ToDoItem) => void;

  onSort: (field: "deadline" | "priority") => void;
  sortField: "deadline" | "priority" | null;
  sortDirection: "asc" | "desc";
}

function ToDoTable({
  todos,
  onToggleCompleted,
  onSelectToDo,
  onSort,
  sortField,
  sortDirection,
}: ToDoTableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="col-status">Status</th>
            <th>Name</th>
            {/*ascend and descend sort of priority*/}
            <th onClick={() => onSort("priority")} className="col-priority">
              Priority
              {sortField === "priority" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>

            {/*ascend and descend sort of deathline*/}
            <th onClick={() => onSort("deadline")} className="col-due">
              Due
              {sortField === "deadline" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th className="notes-colum">Notes</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              onClick={() => {
                console.log("CLICK");
                onSelectToDo(todo);
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => onToggleCompleted(todo)}
                />
              </td>

              <td className="td-text">{todo.title}</td>

              <td className="td-text">{todo.priority}</td>

              {/*date formating*/}
              <td className="td-text">
                {new Date(todo.deadline).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>

              <td className="td-text notes-cell">{todo.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoTable;
