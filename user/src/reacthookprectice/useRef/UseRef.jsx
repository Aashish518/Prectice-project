import { useRef } from "react";

const UseRef =()=> {
    const inputRef = useRef();

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>
                Focus Input
            </button>
        </div>
    );
}


export default UseRef;