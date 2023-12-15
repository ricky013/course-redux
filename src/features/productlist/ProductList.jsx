import { Rating } from "primereact/rating";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import {
	createOptCategories,
	selectedFilterCategory,
	selectedFilterSearch,
	selectedFilterSort,
} from "../filter/filterSlice";

const dummy = [1, 2, 3];

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [filteredProduct, setFilteredProduct] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const selectFilterCategory = useSelector(selectedFilterCategory);
	const selectFilterSort = useSelector(selectedFilterSort);
	const inputSearch = useSelector(selectedFilterSearch);

	// Fungsi untuk mengurutkan array objek berdasarkan properti tertentu secara descending
	function orderByPropertyDescending(arr, prop) {
		return arr.slice().sort((a, b) => b[prop] - a[prop]);
	}

	// Fungsi untuk mengurutkan array objek berdasarkan properti tertentu secara ascending
	function orderByPropertyAscending(arr, prop) {
		return arr.slice().sort((a, b) => a[prop] - b[prop]);
	}

	// Fungsi untuk mengurutkan array objek berdasarkan properti nama secara ascending
	function sortByNameAscending(arr) {
		return arr.slice().sort((a, b) => {
			const nameA = a.title.toLowerCase();
			const nameB = b.title.toLowerCase();
			return nameA.localeCompare(nameB);
		});
	}

	// Fungsi untuk mengurutkan array objek berdasarkan properti nama secara descending
	function sortByNameDescending(arr) {
		return arr.slice().sort((a, b) => {
			const nameA = a.title.toLowerCase();
			const nameB = b.title.toLowerCase();
			return nameB.localeCompare(nameA);
		});
	}

	// Fungsi pencarian berdasarkan nama
	function searchByName(arr, keyword) {
		return arr.filter((obj) =>
			obj.title.toLowerCase().includes(keyword.toLowerCase())
		);
	}

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await fetch("https://fakestoreapi.com/products");
				const data = await response.json();
				setProducts(data);
				setFilteredProduct(data);
				dispatch(createOptCategories(data));
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		let filteredData = [];

		if (selectFilterCategory == "all") {
			filteredData = products;
		} else {
			filteredData = products.filter(
				(obj) => obj.category == selectFilterCategory
			);
		}

		console.log(filteredData);


		switch (selectFilterSort) {
			case "desc":
				filteredData = sortByNameDescending(filteredData);
				break;

			case "asc":
				filteredData = sortByNameAscending(filteredData);
				break;

			case "asc-price":
				filteredData = orderByPropertyAscending(filteredData, "price");
				break;

			case "desc-price":
				filteredData = orderByPropertyDescending(filteredData, "price");
				break;

			default:
				filteredData = filteredData;
				break;
		}

		if (inputSearch !== "") {
			let searchProduct = [];
			searchProduct = searchByName(filteredData, inputSearch);
			setFilteredProduct(searchProduct);
		} else {
			setFilteredProduct(filteredData);
		}
	}, [selectFilterCategory, selectFilterSort, inputSearch]);

	const handleClickBuy = (product) => {
		dispatch(addItemToCart(product));
	};

	return (
		<div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
			{isLoading
				? dummy.map((item) => <Skeleton height="35rem" key={item} />)
				: filteredProduct?.map((product) => (
						<div
							key={product.id}
							className="group bg-white backdrop-blur-lg rounded-xl shadow-xl p-4 w-full"
						>
							<div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
								<img
									src={product.image}
									alt={product.title}
									className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
								/>
							</div>
							<div className="flex flex-col gap-6 mt-8">
								<button
									type="button"
									className="bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-lg py-3 px-8"
									onClick={() => handleClickBuy(product)}
								>
									BUY NOW
								</button>
								<hr />
								<h3 className="font-bold">{product.title}</h3>
								<div className="flex justify-between">
									<div>
										<Rating
											value={product.rating.rate}
											readOnly
											cancel={false}
										/>
										<label>{product.rating.count}</label>
									</div>
									<Tag value={product.category}></Tag>
								</div>
								<h1>
									Price : <strong>{product.price}</strong>
								</h1>
							</div>
						</div>
				  ))}
		</div>
	);
};

export default ProductList;
