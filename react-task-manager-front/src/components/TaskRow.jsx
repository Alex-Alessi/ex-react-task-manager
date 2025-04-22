import "../App.css";
import { memo } from "react";

function TaskRow({ task }) {
  const { id, title, status, createdAt } = task;

  console.log("task props", task);

  const statusColor = () => {
    if (status === "To do") {
      return "red";
    } else if (status === "Doing") {
      return "yellow";
    } else {
      return "green";
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
