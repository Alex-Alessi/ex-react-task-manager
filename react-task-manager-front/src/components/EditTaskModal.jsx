import { useRef, useState } from "react";
import Modal from "./Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedTask = { id: task.id, title, description, status };
    onSave(modifiedTask);
    console.log({ title, description, status });
  };

  const contentForm = (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Titolo</Form.Label>
        <Form.Control
          value={title}
          type="input"
          placeholder=""
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control
          value={description}
          type="textarea"
          placeholder="Aggiungi una descrizione"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Select
        value={status}
        aria-label="Default select example"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="To do">To do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </Form.Select>
    </Form>
  );
  if (!show) return null;
  return (
    <Modal
      title="Modifica Task"
      content={contentForm}
      show={show}
      onClose={onClose}
      onConfirm={() => formRef.current.requestSubmit()}
      confirmText="Modifica"
    />
  );
}
