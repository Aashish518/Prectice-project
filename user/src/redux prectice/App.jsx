import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchdata, adddata, updatedata, deletedata } from "./slice/productSlice"

function Appcode() {
    const [form, setForm] = useState({ name: "", email: "", department: "", salary: "" })
    const [editingId, setEditingId] = useState(null)

    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => state.employees) 

    useEffect(() => {
        dispatch(fetchdata())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editingId) {
            dispatch(updatedata({ ...form, id: editingId }))
            dispatch(fetchdata())
        } else {
            dispatch(adddata(form))
            dispatch(fetchdata())
        }
        setForm({ name: "", email: "", department: "", salary: "" })
        setEditingId(null)
    }

    const handleEdit = (emp) => {
        setForm({
            name: emp.name,
            email: emp.email,
            department: emp.department,
            salary: emp.salary,
        })
        setEditingId(emp.id)
    }

    const handleDelete = (id) => {
        dispatch(deletedata(id))
        dispatch(fetchdata())
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Employee Management CRUD
            </h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white p-6 rounded shadow-md space-y-4"
            >
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    <input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded"
                    />
                    <input
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                    <input
                        placeholder="Department"
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded"
                    />
                    <input
                        placeholder="Salary"
                        value={form.salary}
                        onChange={(e) => setForm({ ...form, salary: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? "Update" : "Add"}
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto mt-8 max-w-5xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Department</th>
                                <th className="px-4 py-2 text-left">Salary</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((emp) => (
                                <tr key={emp.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{emp.id}</td>
                                    <td className="px-4 py-2">{emp.name}</td>
                                    <td className="px-4 py-2">{emp.email}</td>
                                    <td className="px-4 py-2">{emp.department}</td>
                                    <td className="px-4 py-2">{emp.salary}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(emp)}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Appcode
