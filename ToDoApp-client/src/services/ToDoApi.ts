import type { ToDoItem } from "../models/ToDoItem";

const API_URL = "http://localhost:5018/api/todos";

export async function getTodos(): Promise<ToDoItem[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error obteniendo tareas");
  }

  return await response.json();
}

export async function createTask(todo: {
  title: string;
  notes: string;
  priority: string;
  deadline: string;
}) {
  const response = await fetch("http://localhost:5018/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...todo,
      isCompleted: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Error creando tarea");
  }

  return await response.json();
}

export async function updateTask(
  id: number,
  todo: {
    id: number;
    title: string;
    notes: string;
    priority: string;
    isCompleted: boolean;
    deadline: string;
    createdAt: string;
  },
) {
  const response = await fetch(`http://localhost:5018/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Error actualizando tarea");
  }
}

export async function deleteTask(id: number) {
  const response = await fetch(`http://localhost:5018/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminando tarea");
  }
}
