import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import filterSlice from "./features/filter/filterSlice";

export default configureStore({
	reducer: {
		cart: cartSlice.reducer,
		filter: filterSlice.reducer,
	},
});
