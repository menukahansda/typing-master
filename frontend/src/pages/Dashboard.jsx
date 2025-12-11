import React, { useEffect, useState } from "react";
import { Zap, Target, Flame } from "lucide-react";
import ProgressGraph from "../components/ProgressGraph";
import Statcard from "../components/Statcard";

export default function Dashboard() {
  const [option, setOption] = useState(7);
  const [dayArr, setDays] = useState([]);
  const [wpmArr, setWPM] = useState([]);
  const [datesArr, setDates] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/getData/last-${option}-days`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const days = sorted.map((entry) => entry.day);
        const wpm = sorted.map((entry) => entry.sumWPM/entry.count);
        const dates = sorted.map((entry) => {
          const d = new Date(entry.date);
          return `${d.getDate()} ${d.toLocaleString("default", {
            month: "short",
          })}`;
        });

        setDays(days);
        setWPM(wpm);
        setDates(dates);
        console.log(days, wpm, dates);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, [option]);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-items">
        <div className="dashboard-stats">
          <Statcard title="Accuracy" value="90%" icon={<Zap size={24} />} />
          <Statcard
            title="Avg. Speed"
            value="40 WPM"
            icon={<Target size={24} />}
          />
          <Statcard
            title="Streak Count"
            value="3 Days"
            icon={<Flame size={24} />}
          />
        </div>

        <div className="dashboard-progress">
          <div className="flex justify-between items-center mb-6 w-full">
            <h3 className="m-0">WPM History</h3>

            <select
              className="bg-slate-50 border-none text-sm text-slate-600 rounded-lg p-2 outline-none cursor-pointer hover:bg-slate-100"
              onChange={(e) => setOption(Number(e.target.value))}
              value={option}
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
            </select>
          </div>

          <ProgressGraph
            xLabels={option === 7 ? dayArr : datesArr}
            uData={wpmArr}
          />
        </div>
      </div>
    </>
  );
}
