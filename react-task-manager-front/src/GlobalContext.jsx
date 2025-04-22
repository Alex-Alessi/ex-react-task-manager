import { createContext, useState, useEffect, useMemo } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("dati ricevuti"), setTasks(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const tasksMemo = useMemo(() => {
    return tasks;
  }, [tasks]);

  console.log("tasksMemo aggiornato", tasksMemo);

  return (
    <GlobalContext.Provider value={{ tasksMemo }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
