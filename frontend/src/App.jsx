import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Practice from "./pages/Practice";
import Wpm from "./pages/Wpm";
import "./App.css";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wpm/*" element={<Wpm />} />
            <Route path="/practice/*" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
