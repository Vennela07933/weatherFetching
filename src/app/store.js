import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postSlice";

export const store = configureStore({
    reducer: {
        products: postsReducer,
    }
})