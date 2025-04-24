import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [task, setTask] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data.find((e) => e.id == id));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, apiUrl]);

  return (
    <div className="ms-3 mt-3">
      <p>
        <strong>Nome:</strong> {task.title}
      </p>
      <p>
        <strong>Descrizione:</strong> {task.description}
      </p>
      <p>
        <strong>Stato:</strong> {task.status}
      </p>
      <p>
        <strong>Data di creazione:</strong> {task.createdAt}
      </p>
      <button onClick={() => console.log("Elimino task")}>Elimina Task</button>
    </div>
  );
}
