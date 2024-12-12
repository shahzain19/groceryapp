import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/CartSlice"

export const mart = configureStore({
    reducer:{
        cartSlice,
    }
})