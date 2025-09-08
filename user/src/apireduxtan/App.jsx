import { useSelector } from "react-redux";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
    const { isFormOpen } = useSelector((state) => state.ui);

    return (
        <div>
            <h1>Employee CRUD (Redux + TanStack Query)</h1>
            <EmployeeList />
            {isFormOpen && <EmployeeForm />}
        </div>
    );
}

export default App;
