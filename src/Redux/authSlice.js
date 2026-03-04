import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely read from localStorage
const loadState = (key, defaultValue) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return defaultValue;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return defaultValue;
    }
};

const initialState = {
    // If no user exists in localStorage, default to null
    user: loadState("user", null),
    // role can be 'user', 'admin', or null
    role: loadState("role", null),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            // action.payload should be an object: { user: { name, email }, role: 'admin' | 'user' }
            state.user = action.payload.user;
            state.role = action.payload.role;

            // Persist to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("role", JSON.stringify(action.payload.role));
            localStorage.setItem("isAdmin", action.payload.role === 'admin' ? "true" : "false"); // keep backwards compatibility for now if needed
        },
        logout: (state) => {
            state.user = null;
            state.role = null;

            // Clear from localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("isAdmin");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
