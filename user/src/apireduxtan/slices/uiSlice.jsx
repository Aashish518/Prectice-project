import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isFormOpen: false,
        editingEmployee: null,
    },
    reducers: {
        toggleForm: (state, action) => {
            state.isFormOpen = action.payload ?? !state.isFormOpen;
        },
        setEditingEmployee: (state, action) => {
            state.editingEmployee = action.payload;
        },
    },
});

export const { toggleForm, setEditingEmployee } = uiSlice.actions;
export default uiSlice.reducer;
