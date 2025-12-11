import { useState, useRef, useEffect } from "react";
import { Timer } from "lucide-react";
import LiveTimer from "../components/LiveTimer";
import TextArea from "../components/TextArea";
// import { getKeyGroupNum } from "../keyGroups";

function Tests({ testnum }) {
  const [para, setPara] = useState("");
  // const [keyPressed, setKeyPressed] = useState("");
  const [index, setIndex] = useState(0);
  const [correctOrNot, setCorrect] = useState(2);
  const [countCorrect, setCount] = useState(0);
  const [timerStop, setTimerStop] = useState(false);
  const [start, setStart] = useState(false);
  // const [wrongArray, setWrongCount] = useState(() => Array(9).fill(0));

  const indexRef = useRef(0);
  // const wrongArrayRef = useRef(Array(9).fill(0));

  useEffect(() => {
    fetch(
      `http://localhost:3000/generate?difficulty=medium&timelimit=${testnum}`
    )
      .then((res) => res.text())
      .then((data) => {
        setPara(data);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, [testnum]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!timerStop) return;
    const data = {
      wpm: Math.round((countCorrect / 5) / testnum),
      accuracy: (index ? countCorrect / index : 0) * 100,
    };
    fetch("http://localhost:3000/addData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data saved:", data);
      })
      .catch((err) => {
        console.error("Error saving data:", err);
      });
  }, [timerStop, countCorrect, index, testnum]);

  useEffect(() => {
    if (!para) return;

    function handleKeyDown(e) {
      if (e.code === "Space") {
        e.preventDefault();
      }
      if (e.key.length !== 1) return;

      let key = e.key;
      if (e.shiftKey && /^[a-z]$/.test(e.key)) key = e.key.toUpperCase();
      if (indexRef.current === 0) setStart(true);
      // setKeyPressed(key);

      if (key === para[indexRef.current]) {
        setCorrect(1);
        setCount((prev) => prev + 1);
      } else {
        setCorrect(0);
        // const idx = getKeyGroupNum(key.toLowerCase());
        // wrongArrayRef.current[idx] += 1;
        // setWrongCount([...wrongArrayRef.current]);
      }

      setIndex((prev) => prev + 1);
    }

    if (!timerStop) window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [para, timerStop]);
  let acc = index ? countCorrect / index : 0;
  return (
    <div>
      <div className="testpage-stats">
        {
          <LiveTimer
            setTimerStop={setTimerStop}
            num={testnum}
            icon={<Timer />}
            started={start}
          />
        }
        {timerStop && <p>Wpm : {Math.round((countCorrect / 5) / testnum)}</p>}
        {timerStop && <p>Accuracy : {(acc * 100).toFixed(2)}%</p>}
      </div>
      {para && (
        <div className="para-box">
          {<TextArea word={para} ind={index} correct={correctOrNot} />}
        </div>
      )}
    </div>
  );
}

export default Tests;
