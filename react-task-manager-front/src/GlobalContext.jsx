import { createContext, useState, useEffect, useMemo } from "react";
import useTasks from "./useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { getTasks, addTask, removeTask, updateTask } = useTasks();

  console.log("tasksMemo aggiornato", tasksMemo);

  return (
    <GlobalContext.Provider
      value={{ getTasks, addTask, removeTask, updateTask }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
