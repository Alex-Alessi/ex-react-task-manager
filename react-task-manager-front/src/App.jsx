import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalProvider } from "./GlobalContext";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import TaskDetail from "./TaskDetail";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
