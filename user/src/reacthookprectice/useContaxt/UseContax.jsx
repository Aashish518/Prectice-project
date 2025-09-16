import { createContext, useState } from "react";

export const UserContext = createContext();

const UseContax = ({ children }) => {
    const [name, setName] = useState("");

    return (
        <UserContext.Provider value={{ name, setName }}>
            {children}
        </UserContext.Provider>
    )
}

export default UseContax;