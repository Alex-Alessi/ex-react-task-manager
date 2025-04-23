import "../App.css";
import { memo } from "react";

function TaskRow({ task }) {
  const { id, title, status, createdAt } = task;

  console.log("task props", task);

  const statusColor = () => {
    if (status === "To do") {
      return "bg-danger";
    } else if (status === "Doing") {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  };

  return (
    <>
      <td>{id}</td>
      <td>{title}</td>
      <td className={statusColor()}>{status}</td>
      <td>{createdAt}</td>
    </>
  );
}

export default memo(TaskRow);
