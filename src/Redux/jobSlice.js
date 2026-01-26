import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getJobs  } from "../services/axios"

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async () => {
        const data = await getJobs(); // axios get from axios.js
        return data; // will be stored in redux state 
    }
);

const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder 
        .addCase(fetchJobs.pending, (state) => {
            state.loading = true
        })

        .addCase(fetchJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchJobs.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;

        });
    },

});

export default jobsSlice.reducer