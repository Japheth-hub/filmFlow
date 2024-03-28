import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchArgs: ""
}

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        upState: (state) => {
            state.searchArgs = "params"
        }
    }
})

export const {upState} = filterSlice.actions;

export default filterSlice.reducer;