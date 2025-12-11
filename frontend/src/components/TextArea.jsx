import { useEffect, useState } from "react";
const colorArray = ["red", "green", "black", "blue"]

function TextArea({ word, ind, correct }) {
    const [colorString, setColor] = useState([]);

    useEffect(() => {
        if (word) {
            let arr = Array(word.length).fill(2);
            setColor(arr);
            
        }
    }, [word]);
    // change the value of colorString based on prev states
    useEffect(() => {
        setColor(prev => {
            if (!prev || prev.length === 0) return prev;

            return prev.map((el, index) => {
                if (index === ind - 1) return correct; 
                else if (index === ind) return 3;      
                else if (index > ind) return 2;       
                else return el;                       
            });
        });
    }, [ind, correct]);
    return (
        <div className="text-area">
            {word && word.split("").map((letter, index) => (
                <span
                    key={index}
                    style={{
                        color: colorArray[colorString[index]] || "black", 
                        fontWeight: index === ind ? "bold" : "normal",
                    }}
                >
                    {(index === ind && letter === " ") ? "_" : letter}
                </span>
            ))}
        </div>
    );
}

export default TextArea;
