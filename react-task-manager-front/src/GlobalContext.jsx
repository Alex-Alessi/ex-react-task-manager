import { createContext } from "react";
import useTasks from "./useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const { getTasks, addTask, removeTask, updateTask } = useTasks();

  return (
    <GlobalContext.Provider
      value={{ getTasks, addTask, removeTask, updateTask }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
