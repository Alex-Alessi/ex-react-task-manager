import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  const tasksMemo = useMemo(() => {
    return tasks;
  }, [tasks]);

  function getTasks() {
    return tasksMemo;
  }

  function addTask(id) {}
  function removeTask(id) {}
  function updateTask(id) {}

  return { getTasks, addTask, removeTask, updateTask };
}
