import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";

export default function TaskDetail() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const { removeTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

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

  function onClose() {
    setShowModal(false);
  }

  async function onConfirm() {
    const result = await removeTask(id);
    if (result.success) {
      alert("Task eliminata con successo");
      navigate("/tasks");
    } else {
      alert("impossibile eliminare la task");
    }
  }

  return (
    <div id="detail-page" className="ms-3 mt-3">
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
      <button onClick={() => setShowModal(true)}>Elimina Task</button>
      {showModal && (
        <Modal
          title="Conferma eliminazione"
          content="Sei sicuro di voler eliminare questa task?"
          show={showModal}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
}
