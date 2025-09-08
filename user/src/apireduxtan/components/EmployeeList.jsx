import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import { toggleForm, setEditingEmployee } from "../slices/uiSlice";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { data: employees = [], isLoading } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Employee List</h2>
            <button onClick={() => dispatch(toggleForm(true))}>Add Employee</button>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(setEditingEmployee(emp));
                                    dispatch(toggleForm(true));
                                }}>Edit</button>
                                <button onClick={() => deleteMutation.mutate(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EmployeeList;
