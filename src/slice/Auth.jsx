import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "counter",
    initialState: {
        token: localStorage.getItem("token") || "",
        role: localStorage.getItem("role") || "",
        isAuthenticated: Boolean(localStorage.getItem("token"))
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
        },
        logout: (state) => {
            state.token = "";
            state.role = "";
            state.isAuthenticated = false;

            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer