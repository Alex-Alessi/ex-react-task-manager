import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import TaskRow from "./components/TaskRow";
import Table from "react-bootstrap/Table";
import "./App.css";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

export default function TaskList() {
  const { getTasks } = useContext(GlobalContext);
  const tasks = getTasks();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSort(colonna) {
    if (sortBy === colonna) {
      if (sortOrder == 1) {
        setSortOrder(-1);
      } else {
        setSortOrder(1);
      }
    } else {
      setSortBy(colonna);
      setSortOrder(1);
    }
  }

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 1000),
    []
  );

  const sortMemo = useMemo(() => {
    const tasksFiltered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...tasksFiltered];

    if (sortBy === "title") {
      const titleOrdered = sorted.sort(
        (a, b) => a.title.localeCompare(b.title) * sortOrder
      );
      return titleOrdered;
    } else if (sortBy === "status") {
      const ordine = ["To do", "Doing", "Done"];
      const statusOrdered = sorted.sort((a, b) => {
        return (
          (ordine.indexOf(a.status) - ordine.indexOf(b.status)) * sortOrder
        );
      });
      return statusOrdered;
    } else if (sortBy === "createdAt") {
      const datesOrdered = sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return (dateB - dateA) * sortOrder;
      });
      return datesOrdered;
    }
    return sortMemo;
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <div>
      <div className="ms-2">
        <h2 className="my-2">Lista dei Task</h2>
        <input
          className="mb-3"
          placeholder="Cerca task..."
          onChange={(e) => debouncedSearch(e.target.value)}
        ></input>
      </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort("title")} className="thHover">
              Nome
            </th>
            <th onClick={() => handleSort("status")} className="thHover">
              Stato
            </th>
            <th onClick={() => handleSort("createdAt")} className="thHover">
              Data di Creazione
            </th>
          </tr>
        </thead>
        <tbody>
          {sortMemo.map((task) => (
            <tr key={task.id} className="table-item">
              <TaskRow task={task} />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
