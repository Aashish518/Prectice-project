import { useContext } from "react";
import { UserContext } from "./UseContax";

const Page2=()=> {
    const { name } = useContext(UserContext);

    return (
        <div>
            <h2>Page 2 - Show Name</h2>
            {name ? <p>Your Name: {name}</p> : <p>No name set yet.</p>}
        </div>
    );
}

export default Page2;
