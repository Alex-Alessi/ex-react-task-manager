import "../App.css";
import { memo } from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  const { id, title, status, createdAt } = task;

  // console.log("task props", task);

  const statusColor = () => {
    if (status === "To do") {
      return "bg-danger";
    } else if (status === "Doing") {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  };

  const date = new Date(createdAt).toLocaleString("it-IT");

  return (
    <>
      <td>{id}</td>
      <td>
        <Link to={`/tasks/${id}`}>{title}</Link>
      </td>
      <td className={statusColor()}>{status}</td>
      <td>{date}</td>
    </>
  );
}

export default memo(TaskRow);
