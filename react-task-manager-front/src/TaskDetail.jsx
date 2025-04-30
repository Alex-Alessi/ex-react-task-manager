import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTasks from "./useTasks";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";
import EditTaskModal from "./components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const { removeTask } = useTasks();
  const { updateTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
    setShowEditModal(false);
    setShowModal(false);
  }

  async function onConfirm() {
    const result = await removeTask(id);
    if (result.success) {
      alert("Task eliminata con successo");
      navigate("/tasks");
    } else {
      alert("Impossibile eliminare la task");
    }
  }

  async function onSave(modifiedTask) {
    const result = await updateTask(modifiedTask);
    console.log("Questo è il result", result);
    if (result.success) {
      alert("Task modificata con successo");
      setShowEditModal(false);
      navigate("/tasks");
    } else {
      alert("Impossibile modificare la task");
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
      <button onClick={() => setShowEditModal(true)}>Modifica task</button>
      {showEditModal && (
        <EditTaskModal
          show={showEditModal}
          onClose={onClose}
          task={task}
          onSave={onSave}
        />
      )}

      <button onClick={() => setShowModal(true)}>Elimina Task</button>
      {showModal && (
        <Modal
          title="Conferma eliminazione"
          content="Sei sicuro di voler eliminare questa task?"
          show={showModal}
          onClose={onClose}
          onConfirm={onConfirm}
          confirmText="Elimina"
        />
      )}
    </div>
  );
}
