import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import TaskRow from "./components/TaskRow";
import Table from "react-bootstrap/Table";
import "./App.css";

export default function TaskList() {
  const { tasksMemo } = useContext(GlobalContext);

  return (
    <div>
      <h2>Lista dei Task</h2>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasksMemo.map((task) => (
            <tr key={task.id} className="table-item">
              <TaskRow task={task} />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
