import { Link } from "react-router-dom";

export default function Choices() {
    return (
        <>
            <h2 className="wpm-heading">Choose a test to check Wpm</h2>
            <div className="choice-bar">
                <div className="ch"><Link to="test-1-min">Type for 1 min</Link></div>
                <div className="ch"><Link to="test-3-min">Type for 3 min</Link></div>
                <div className="ch"><Link to="test-5-min">Type for 5 min</Link></div>
            </div>
        </>
    );
}