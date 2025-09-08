import { useEffect, useState } from "react";

const Prectice = () => {
    const [form, setForm] = useState({ name: "", price: "", qty: "" });
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem("product");
        return saved ? JSON.parse(saved) : [];
    });
    const [index, setIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        localStorage.setItem("product", JSON.stringify(data));
    }, [data]);

    const handleformdata = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (index !== null) {
            const updated = [...data];
            updated[index] = form;
            setData(updated);
            setIndex(null);
        } else {
            setData([...data, form]);
        }
        handleclear();
    };

    const handleclear = () => {
        setForm({ name: "", price: "", qty: "" });
    };

    const handleedit = (item, i) => {
        setForm({ name: item.name, price: item.price, qty: item.qty });
        setIndex(i);
    };

    const handledelete = (i) => {
        const updated = [...data];
        updated.splice(i, 1);
        setData(updated);
    };

    const handlepage = (value) => {
        if (value === "d") {
            if (currentPage > 1) setCurrentPage((c) => c - 1);
        } else {
            const totalPages = Math.ceil(data.length / itemsPerPage);
            if (currentPage < totalPages) setCurrentPage((c) => c + 1);
        }
    };

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = data.slice(indexOfFirst, indexOfLast);

    const total = data.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.qty),
        0
    );

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-2xl shadow-xl animate-fadeIn">
            {/* Form */}
            <form
                onSubmit={handlesubmit}
                className="flex flex-col md:flex-row gap-3 mb-6"
            >
                <input
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    value={form.name}
                    onChange={handleformdata}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-pink-400 transition"
                />
                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={form.price}
                    onChange={handleformdata}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-400 transition"
                />
                <input
                    type="number"
                    placeholder="Qty"
                    name="qty"
                    value={form.qty}
                    onChange={handleformdata}
                    className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-5 py-2 shadow-md hover:scale-105 transform transition"
                >
                    {index === null ? "Submit" : "Update"}
                </button>
                <button
                    type="button"
                    onClick={handleclear}
                    className="bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg px-5 py-2 shadow-md hover:scale-105 transform transition"
                >
                    Clear
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        <tr>
                            <th className="p-3 border">No</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Qty</th>
                            <th className="p-3 border">Total Price</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, i) => (
                            <tr
                                key={i}
                                className="text-center hover:bg-pink-100 transition"
                            >
                                <td className="p-3 border">{indexOfFirst + i + 1}</td>
                                <td className="p-3 border font-semibold text-gray-700">
                                    {item.name}
                                </td>
                                <td className="p-3 border text-green-600">₹{item.price}</td>
                                <td className="p-3 border text-blue-600">{item.qty}</td>
                                <td className="p-3 border text-purple-600 font-semibold">
                                    ₹{Number(item.price) * Number(item.qty)}
                                </td>
                                <td className="p-3 border flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleedit(item, indexOfFirst + i)}
                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded shadow hover:scale-105 transform transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handledelete(indexOfFirst + i)}
                                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded shadow hover:scale-105 transform transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-3 text-gray-500 text-center">
                                    🚀 No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => handlepage("d")}
                    className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-3 py-1 rounded shadow hover:scale-105 transform transition disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                <span className="px-4 font-semibold text-indigo-700">
                    {currentPage} Page Of {Math.ceil(data.length / itemsPerPage)}
                </span>
                <button
                    onClick={() => handlepage("i")}
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-1 rounded shadow hover:scale-105 transform transition disabled:opacity-50"
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                    {">"}
                </button>
            </div>

            {/* Total */}
            <div className="mt-6 text-lg font-bold text-center">
                Grand Total:{" "}
                <span className="text-pink-600 animate-pulse">₹{total}</span>
            </div>
        </div>
    );
};

export default Prectice;
