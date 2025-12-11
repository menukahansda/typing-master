import { Routes, Route, useLocation } from "react-router-dom";
import Choices from "./Choices";
import Tests from "./Tests";

export default function Wpm() {
  const location = useLocation();

  // show Choices only when user is at /wpm (base path)
  const showChoices = location.pathname === "/wpm";

  return (
    <div className="choices-container">
      {showChoices && <Choices />}
      <div className="choices-content">
        <Routes>
          <Route path="test-1-min" element={<Tests testnum={1} />} />
          <Route path="test-3-min" element={<Tests testnum={3} />} />
          <Route path="test-5-min" element={<Tests testnum={5} />} />
        </Routes>
      </div>
    </div>
  );
}
