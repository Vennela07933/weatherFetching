import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ()=>{
    const response = await axios.get("https://dummyjson.com/products?limit=30");
    return response.data.products;
})

const postSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPosts.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default postSlice.reducer;