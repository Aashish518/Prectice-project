import api from "./axios";

export const getEmployees = async () => {
    const res = await api.get("/employees");
    return res.data;
};

export const addEmployee = async (data) => {
    const res = await api.post("/employees", data);
    return res.data;
};

export const updateEmployee = async ({ id, data }) => {
    const res = await api.put(`/employees/${id}`, data);
    return res.data;
};

export const deleteEmployee = async (id) => {
    const res = await api.delete(`/employees/${id}`);
    return res.data;
};
