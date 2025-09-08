import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee, updateEmployee } from "../api/employeeApi";
import { toggleForm, setEditingEmployee } from "../slices/uiSlice";
import { useState, useEffect } from "react";

const EmployeeForm = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { editingEmployee } = useSelector((state) => state.ui);

    const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" });

    useEffect(() => {
        if (editingEmployee) setForm(editingEmployee);
    }, [editingEmployee]);

    const addMutation = useMutation({
        mutationFn: addEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const updateMutation = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEmployee) {
            updateMutation.mutate({ id: editingEmployee.id, data: form });
        } else {
            addMutation.mutate(form);
        }
        setForm({ name: "", email: "", department: "", salary: "" });
        dispatch(setEditingEmployee(null));
        dispatch(toggleForm(false));
    };

    return (
        <div>
            <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
                <input placeholder="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
                <input placeholder="Department" value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })} /><br />
                <input placeholder="Salary" value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })} /><br />
                <button type="submit">{editingEmployee ? "Update" : "Add"}</button>
                <button type="button" onClick={() => dispatch(toggleForm(false))}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
