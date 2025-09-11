import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// 🔹 Fetch all employees
export const fetchdata = createAsyncThunk("employees/fetch", async () => {
    const res = await fetch("http://localhost:5000/api/employees")
    return res.json()
})

// 🔹 Add employee
export const adddata = createAsyncThunk("employees/add", async (employee) => {
    const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    })
    return res.json()
})

// 🔹 Update employee
export const updatedata = createAsyncThunk("employees/update", async (employee) => {
    const res = await fetch(`http://localhost:5000/api/employees/${employee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    })
    return res.json()
})

// 🔹 Delete employee
export const deletedata = createAsyncThunk("employees/delete", async (id) => {
    await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" })
    return id
})

const employeesSlice = createSlice({
    name: "employees",
    initialState: { data: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchdata.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchdata.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchdata.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // add
            .addCase(adddata.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            // update
            .addCase(updatedata.fulfilled, (state, action) => {
                const index = state.data.findIndex(emp => emp.id === action.payload.id)
                if (index !== -1) {
                    state.data[index] = action.payload
                }
            })
            // delete
            .addCase(deletedata.fulfilled, (state, action) => {
                state.data = state.data.filter(emp => emp.id !== action.payload)
            })
    },
})

export default employeesSlice.reducer
