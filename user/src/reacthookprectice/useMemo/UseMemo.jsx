import { useState, useMemo } from "react";

const UseMemo=()=> {
    const [num, setNum] = useState(0);
    const [dark, setDark] = useState(false);

    const double = useMemo(() => {
        console.log("Calculating...");
        return num * 2;
    }, [num]);

    return (
        <div style={{ background: dark ? "black" : "white", color: dark ? "white" : "black" }}>
            <p>Double: {double}</p>
            <button onClick={() => setNum(num + 1)}>Increase</button>
            <button onClick={() => setDark(!dark)}>Toggle Theme</button>
        </div>
    );
}


export default UseMemo;