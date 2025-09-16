import { useContext, useState } from "react";
import { UserContext } from "./UseContax";

const Page1=()=> {
    const { setName } = useContext(UserContext);
    const [input, setInput] = useState("");

    const handleSave = () => {
        setName(input);
        setInput("");
    };

    return (
        <div>
            <h2>Page 1 - Enter Name</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your name"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default Page1;
