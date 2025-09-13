import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions for demonstration
const getEmployees = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
        { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", salary: "75000" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", salary: "65000" },
    ];
};

const createEmployee = async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...employee, id: Date.now() };
};

const editEmployee = async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return employee;
};

const removeEmployee = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return id;
};

const App = () => {
    const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" });
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [notification, setNotification] = useState(null);
    const queryClient = useQueryClient();

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

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
            queryClient.setQueryData(['employees'], old => [...(old || []), { id: Date.now(), ...newEmp }]);
            return { previous };
        },
        onSuccess: () => {
            showNotification('Employee added successfully!');
        },
        onError: (err, newEmp, context) => {
            queryClient.setQueryData(['employees'], context.previous);
            showNotification('Failed to add employee', 'error');
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
                (old || []).map(emp => emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp)
            );
            return { previous };
        },
        onSuccess: () => {
            showNotification('Employee updated successfully!');
        },
        onError: (err, updatedEmployee, context) => {
            queryClient.setQueryData(['employees'], context.previous);
            showNotification('Failed to update employee', 'error');
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    });

    // Delete employee mutation
    const deleteMutation = useMutation({
        mutationFn: removeEmployee,
        onMutate: async (id) => {
            setDeletingId(id);
            await queryClient.cancelQueries({ queryKey: ['employees'] });
            const previous = queryClient.getQueryData(['employees']);
            queryClient.setQueryData(['employees'], old => (old || []).filter(emp => emp.id !== id));
            return { previous };
        },
        onSuccess: () => {
            showNotification('Employee deleted successfully!');
            setDeletingId(null);
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(['employees'], context.previous);
            showNotification('Failed to delete employee', 'error');
            setDeletingId(null);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
    });

    // Form submit
    const handleSubmit = () => {
        if (!form.name || !form.email || !form.department || !form.salary) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

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

    // Cancel edit
    const handleCancelEdit = () => {
        setForm({ name: "", email: "", department: "", salary: "" });
        setEditingId(null);
    };

    // Delete employee
    const handleDelete = (id) => deleteMutation.mutate(id);

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 transition-all duration-500">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl transition-all duration-500 transform animate-bounce ${notification.type === 'error'
                        ? 'bg-red-500 text-white border-l-4 border-red-700'
                        : 'bg-green-500 text-white border-l-4 border-green-700'
                    }`}>
                    <div className="flex items-center">
                        <span className="mr-2">
                            {notification.type === 'error' ? '❌' : '✅'}
                        </span>
                        {notification.message}
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 transform animate-pulse">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Employee Management
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your team with style</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Form Card */}
                <div className="mb-10 transform transition-all duration-500 hover:scale-[1.02]">
                    <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg mr-3">
                                    {editingId ? '✏️' : '➕'}
                                </span>
                                {editingId ? 'Edit Employee' : 'Add New Employee'}
                            </h2>
                            {editingId && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="text-gray-400 hover:text-red-500 transition-all duration-200 text-2xl hover:rotate-90 transform"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {[
                                { field: "name", type: "text", placeholder: "Full Name", icon: "👤" },
                                { field: "email", type: "email", placeholder: "Email Address", icon: "📧" },
                                { field: "department", type: "text", placeholder: "Department", icon: "🏢" },
                                { field: "salary", type: "number", placeholder: "Salary ($)", icon: "💰" }
                            ].map(({ field, type, placeholder, icon }, index) => (
                                <div
                                    key={field}
                                    className="relative transform transition-all duration-300 hover:scale-105"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">
                                        {icon}
                                    </div>
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        value={form[field]}
                                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 bg-white/50"
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={addMutation.isPending || updateMutation.isPending}
                            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
                        >
                            {(addMutation.isPending || updateMutation.isPending) ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    <span className="animate-pulse">
                                        {editingId ? 'Updating Employee...' : 'Adding Employee...'}
                                    </span>
                                </div>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2 text-xl">
                                        {editingId ? '💾' : '🚀'}
                                    </span>
                                    {editingId ? 'Update Employee' : 'Add Employee'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
                                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                                </div>
                                <p className="text-gray-600 text-xl mt-4 animate-pulse">Loading employees...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                                    <tr>
                                        {[
                                            { label: "ID", icon: "🆔" },
                                            { label: "Name", icon: "👤" },
                                            { label: "Email", icon: "📧" },
                                            { label: "Department", icon: "🏢" },
                                            { label: "Salary", icon: "💰" },
                                            { label: "Actions", icon: "⚙️" }
                                        ].map(({ label, icon }) => (
                                            <th key={label} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                                                <div className="flex items-center">
                                                    <span className="mr-2">{icon}</span>
                                                    {label}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data?.map((emp, index) => (
                                        <tr
                                            key={emp.id}
                                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group transform hover:scale-[1.01]"
                                            style={{
                                                animation: `slideInFromLeft 0.5s ease-out ${index * 0.1}s both`,
                                                opacity: deletingId === emp.id ? 0.5 : 1
                                            }}
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                                <span className="bg-gray-100 px-2 py-1 rounded-full">#{emp.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                                        {emp.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="font-semibold text-gray-900">{emp.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <span className="mr-2">📧</span>
                                                    {emp.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full border border-blue-200">
                                                    {emp.department}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-green-600">
                                                <div className="flex items-center">
                                                    <span className="mr-1">💰</span>
                                                    ${parseInt(emp.salary).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                                                    <button
                                                        onClick={() => handleEdit(emp)}
                                                        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
                                                    >
                                                        <span className="flex items-center">
                                                            <span className="mr-1">✏️</span>
                                                            Edit
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(emp.id)}
                                                        disabled={deletingId === emp.id}
                                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-xl"
                                                    >
                                                        {deletingId === emp.id ? (
                                                            <div className="flex items-center">
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                                <span className="text-xs">Deleting...</span>
                                                            </div>
                                                        ) : (
                                                            <span className="flex items-center">
                                                                <span className="mr-1">🗑️</span>
                                                                Delete
                                                            </span>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {data?.length === 0 && !isLoading && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-16">
                                                <div className="text-gray-400 transform animate-bounce">
                                                    <div className="text-6xl mb-4">👥</div>
                                                    <p className="text-2xl font-semibold text-gray-600 mb-2">No employees found</p>
                                                    <p className="text-lg text-gray-500">Add your first team member to get started!</p>
                                                    <div className="mt-4">
                                                        <div className="inline-block animate-pulse bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                                                            Click "Add Employee" above ⬆️
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats Dashboard */}
                {data?.length > 0 && (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Total Employees",
                                value: data.length,
                                icon: "👥",
                                color: "from-blue-500 to-blue-600",
                                bgColor: "from-blue-50 to-blue-100"
                            },
                            {
                                title: "Departments",
                                value: new Set(data.map(emp => emp.department)).size,
                                icon: "🏢",
                                color: "from-green-500 to-green-600",
                                bgColor: "from-green-50 to-green-100"
                            },
                            {
                                title: "Average Salary",
                                value: `${Math.round(data.reduce((sum, emp) => sum + parseInt(emp.salary || 0), 0) / data.length).toLocaleString()}`,
                                icon: "💰",
                                color: "from-purple-500 to-purple-600",
                                bgColor: "from-purple-50 to-purple-100"
                            },
                            {
                                title: "Total Payroll",
                                value: `${data.reduce((sum, emp) => sum + parseInt(emp.salary || 0), 0).toLocaleString()}`,
                                icon: "💵",
                                color: "from-indigo-500 to-indigo-600",
                                bgColor: "from-indigo-50 to-indigo-100"
                            }
                        ].map((stat, index) => (
                            <div
                                key={stat.title}
                                className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                                style={{ animation: `slideInUp 0.6s ease-out ${index * 0.1}s both` }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-xl shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-800 mb-1 animate-pulse">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    {stat.title}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
                        <p className="text-gray-600 text-sm">
                            Made with ❤️ using React Query & Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-gradient {
                    background-size: 400% 400%;
                    animation: gradient 3s ease infinite;
                }

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default App;