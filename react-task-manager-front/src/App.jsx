import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./GlobalContext";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
