import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	onChangeCategory,
	onChangeSearch,
	onChangeSort,
	optionFilterCategory,
	selectedFilterCategory
} from "./filterSlice";

const opt = [
	{
		label: "",
		items: [
			{ value: "asc", label: "A to Z" },
			{ value: "desc", label: "Z to A" },
		],
	},
	{
		label: "Price",
		items: [
			{ value: "asc-price", label: "Low to High" },
			{ value: "desc-price", label: "High to Low" },
		],
	},
];

function Filter(props) {
	let [selectedCategory, setSelectedCategory] = useState("all");
	let [selectedSort, setSelectedSort] = useState("");

	const optCategory = useSelector(optionFilterCategory);
	const selectCategory = useSelector(selectedFilterCategory);
	const dispatch = useDispatch();

	useEffect(() => {
		setSelectedSort("");
	}, [selectCategory]);

	return (
		<div className="bg-white backdrop-blur-lg rounded-xl shadow-inner p-4 w-full mt-5">
			{/* <h1 className="text-2xl">Filter</h1> */}
			<div className="mt-3 flex justify-between gap-3 flex-wrap">
				<span className="p-float-label flex-1">
					<Dropdown
						inputId="dd-filter-category"
						value={selectedCategory}
						onChange={(e) => {
							setSelectedCategory(e.value);
							dispatch(onChangeCategory(e.value));
						}}
						options={optCategory}
						optionLabel="label"
						className="w-full md:w-14rem"
					/>
					<label htmlFor="dd-city">Category</label>
				</span>
				<span className="p-float-label flex-1">
					<Dropdown
						inputId="dd-city"
						value={selectedSort}
						onChange={(e) => {
							setSelectedSort(e.value);
							dispatch(onChangeSort(e.value));
						}}
						options={opt}
						optionLabel="label"
						optionGroupLabel="label"
						optionGroupChildren="items"
						className="w-full md:w-14rem"
					/>
					<label htmlFor="dd-city">Sort by</label>
				</span>
				<div className="p-inputgroup flex-2">
					<InputText
						placeholder="Keyword"
						onInput={(e) => dispatch(onChangeSearch(e.target.value))}
					/>
					<span className="p-inputgroup-addon">
						<i className="pi pi-search"></i>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Filter;
