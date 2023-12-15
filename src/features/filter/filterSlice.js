import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filterCategoryOption: [],
	filterCategory: "all",
	filterSort: "",
	filterSearch:""
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		createOptCategories: (state, action) => {
			let data = action.payload;
			let categories = data.reduce((acc, curr) => {
				if (!acc.includes(curr.category)) {
					acc.push(curr.category);
				}
				return acc;
			}, []);
			let opt = [{ value: "all", label: "All" }];
			categories.map((item) => {
				let obj = {
					value: item,
					label: item,
				};
				opt.push(obj);
			});
			state.filterCategoryOption = opt;
		},
		onChangeCategory: (state, action) => {
			let data = action.payload;
			state.filterCategory = data;
		},
		onChangeSort: (state, action) => {
			let data =action.payload;
			state.filterSort = data;
		},
		onChangeSearch: (state, action) => {
			let data = action.payload;
			state.filterSearch = data;
		},
	},
});

export const { createOptCategories, onChangeCategory, onChangeSort,onChangeSearch } =
	filterSlice.actions;

export default filterSlice;

export const optionFilterCategory = (state) =>
	state.filter.filterCategoryOption;
export const selectedFilterCategory = (state) => state.filter.filterCategory;
export const selectedFilterSort = (state) => state.filter.filterSort;
export const selectedFilterSearch = (state) => state.filter.filterSearch;
