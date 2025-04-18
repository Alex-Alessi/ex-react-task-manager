import "../App.css";

export default function TaskRow(task) {
  const { id, title, status, createdAt } = task.task;

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
