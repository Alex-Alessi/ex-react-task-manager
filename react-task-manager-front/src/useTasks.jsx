import { useState, useEffect, useMemo } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  const tasksMemo = useMemo(() => {
    return tasks;
  }, [tasks]);

  function getTasks() {
    return tasksMemo;
  }

  async function addTask({ title, description, status }) {
    const newTask = {
      title: title,
      description: description,
      status: status,
    };
    try {
      const res = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setTasks((prev) => [...prev, data.task]);

      return { success: true, task: data.task };
    } catch (err) {
      console.error("Errore:", err);
      return { success: false, message: err.message };
    }
  }
  function removeTask(id) {}
  function updateTask(id) {}

  return { getTasks, addTask, removeTask, updateTask };
}
