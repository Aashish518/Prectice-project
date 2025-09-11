import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../slice/productSlice"

const store = configureStore({
    reducer: {
        employees: employeesReducer,
    },
})

export default store;
