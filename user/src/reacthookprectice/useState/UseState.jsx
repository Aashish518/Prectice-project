import { useState } from "react";

const UseState=()=> {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount((c)=>c+1)}>Increase</button>
        </div>
    );
}

export default UseState;
