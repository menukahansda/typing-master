import { useState, useEffect } from "react";

function LiveTimer({ setTimerStop, num, started}) {
	const [seconds, setSeconds] = useState(60 * num);

	useEffect(() => {
		if(!started ) return;
		const interval = setInterval(() => {
			setSeconds(prev => {
				if (prev <= 0) {
					setTimerStop(true);
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			})
		}, 1000);

		// cleanup on unmount
		return () => {
			clearInterval(interval);
		}
	}, [started, setTimerStop]);
	const minutes = Math.floor(seconds / 60);
	const remSeconds = seconds % 60;
	return (
		<div style={{ fontSize: "2rem", fontFamily: "monospace" }}>
			{/* {icon} */}
			{String(minutes).padStart(2, "0")}:{String(remSeconds).padStart(2, "0")}
		</div>
	);
}

export default LiveTimer;
