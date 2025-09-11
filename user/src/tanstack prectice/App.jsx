import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, createEmployee, editEmployee, removeEmployee } from "./api/employees";

const App = () => {
    const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" });
    const [editingId, setEditingId] = useState(null);
    const queryClient = useQueryClient();

    // Fetch employees
    const { data = [], isLoading } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees,
        select: (res) => Array.isArray(res) ? res : res.employees || [], 
    });

    // Add employee mutation
    const addMutation = useMutation({
        mutationFn: createEmployee,
        onMutate: async (newEmp) => {
            await queryClient.cancelQueries({ queryKey: ['employees'] });
            const previous = queryClient.getQueryData(['employees']);
            queryClient.setQueryData(['employees'], old => [...old, { id: Date.now(), ...newEmp }]);
            return { previous };
        },
        onError: (err, newEmp, context) => {
            queryClient.setQueryData(['employees'], context.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    });

    // Update employee mutation
    const updateMutation = useMutation({
        mutationFn: editEmployee,
        onMutate: async (updatedEmployee) => {
            await queryClient.cancelQueries({ queryKey: ['employees'] });
            const previous = queryClient.getQueryData(['employees']);
            queryClient.setQueryData(['employees'], old =>
                old.map(emp => emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp)
            );
            return { previous };
        },
        onError: (err, updatedEmployee, context) => {
            queryClient.setQueryData(['employees'], context.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    });

    // Delete employee mutation
    const deleteMutation = useMutation({
        mutationFn: removeEmployee,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['employees'] });
            const previous = queryClient.getQueryData(['employees']);
            queryClient.setQueryData(['employees'], old => old.filter(emp => emp.id !== id));
            return { previous };
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(['employees'], context.previous);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    });

    // Form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) updateMutation.mutate({ ...form, id: editingId });
        else addMutation.mutate(form);
        setForm({ name: "", email: "", department: "", salary: "" });
        setEditingId(null);
    };

    // Edit employee
    const handleEdit = (emp) => {
        setForm({ name: emp.name, email: emp.email, department: emp.department, salary: emp.salary });
        setEditingId(emp.id);
    };

    // Delete employee
    const handleDelete = (id) => deleteMutation.mutate(id);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Employee Management CRUD</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow-md space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    {["name", "email"].map((field) => (
                        <input
                            key={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            className="flex-1 px-4 py-2 border rounded"
                        />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    {["department", "salary"].map((field) => (
                        <input
                            key={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            className="flex-1 px-4 py-2 border rounded"
                        />
                    ))}
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {editingId ? "Update" : "Add"}
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto mt-8 max-w-5xl mx-auto">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                {["ID", "Name", "Email", "Department", "Salary", "Actions"].map((head) => (
                                    <th key={head} className="px-4 py-2 text-left">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((emp) => (
                                <tr key={emp.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{emp.id}</td>
                                    <td className="px-4 py-2">{emp.name}</td>
                                    <td className="px-4 py-2">{emp.email}</td>
                                    <td className="px-4 py-2">{emp.department}</td>
                                    <td className="px-4 py-2">{emp.salary}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button onClick={() => handleEdit(emp)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                                        <button onClick={() => handleDelete(emp.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {data?.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default App;
