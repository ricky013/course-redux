import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import ProductList from "./features/productlist/ProductList";
import CartModal from "./features/cart/CartModal";
import Filter from "./features/filter/Filter";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primeicons/primeicons.css";

function App() {
	const [isOpenModalCart, setIsOpenModalCart] = useState(false);

	const handleOpenModalCart = () => {
		setIsOpenModalCart(true);
	};
	const handleHideModalCart = () => {
		setIsOpenModalCart(false);
	};

	return (
		<div className="relative">
			<PrimeReactProvider>
				{isOpenModalCart ? (
					<CartModal handleHideModalCart={handleHideModalCart} />
				) : null}
				<div className="fixed top-0 w-full z-20">
					<Header handleOpenModalCart={handleOpenModalCart} />
				</div>
				<main className="max-w-7xl mx-auto px-4 pt-20">
					<Filter />
					<ProductList />
				</main>
			</PrimeReactProvider>
		</div>
	);
}

export default App;
