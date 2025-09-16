import { useEffect, useState } from "react";

const UseEffect=()=> {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTime(t => t + 1), 1000);

        return () => clearInterval(interval); 
    }, []);

    return <p>Time: {time}</p>;
}

export default UseEffect;