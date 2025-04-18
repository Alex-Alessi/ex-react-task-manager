import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error("Errore nel caricamento dei task: ", error);
      });
  }, []);
  return (
    <div>
      <h2>Lista dei Task</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
