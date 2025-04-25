import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useTasks from "./useTasks";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [msgTitle, setMsgTitle] = useState("");
  const descrizioneRef = useRef();
  const statoRef = useRef();
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    const valDescription = descrizioneRef.current.value;
    const valStatus = statoRef.current.value;
    e.preventDefault();
    if (!title || title.split("").some((char) => symbols.includes(char))) {
      console.log("Campo non valido!");
      return;
    } else {
      const result = await addTask({
        title,
        description: valDescription,
        status: valStatus,
      });

      console.log("Risultato addTask:", result);

      if (result.success) {
        alert("Task aggiunta con successo!");
        setTitle("");
        descrizioneRef.current.value = "";
        statoRef.current.value = "To do";
        return;
      } else {
        alert(result.message);
      }

      addTask({ title, description: valDescription, status: valstatus });
    }
  };
  return (
    <div>
      <h2>Aggiungi un nuovo Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome del task</Form.Label>
          <Form.Control
            type="input"
            placeholder="Aggiungi il nome del task"
            onChange={(e) => {
              const val = e.target.value;
              setTitle(val);
              if (!val.split("").some((char) => symbols.includes(char))) {
                setMsgTitle("Il titolo del task è valido");
              } else {
                setMsgTitle(
                  "Il titolo del task non può contenere caratteri speciali"
                );
              }
            }}
          />
        </Form.Group>
        {msgTitle && (
          <Form.Text
            className={
              msgTitle.includes("valido") ? "text-success" : "text-danger"
            }
          >
            {msgTitle}
          </Form.Text>
        )}

        <Form.Group className="mb-3 mt-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Aggiungi una descrizione"
            rows={3}
            ref={descrizioneRef}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stato</Form.Label>
          <Form.Select aria-label="Default select example" ref={statoRef}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Aggiungi Task
        </Button>
      </Form>
    </div>
  );
}
