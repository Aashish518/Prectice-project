import api from "./config";

export const getEmployees = async () => {
    const { data } = await api.get("/");
    return data;
};

export const createEmployee = async (employee) => {
    const { data } = await api.post("/", employee);
    return data;
};

export const editEmployee = async (employee) => {
    const { data } = await api.put(`/${employee.id}`, employee);
    return data;
};

export const removeEmployee = async (id) => {
    const { data } = await api.delete(`/${id}`);
    return data;
};