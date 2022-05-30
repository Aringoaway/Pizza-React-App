import { useDispatch } from "react-redux";

import './App.css';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="wrapper">
			<Header/>
			<div className="content">
				<Routes>
					<Route path="/" exact element={<Home/>}/>
					<Route path="/cart" exact element={<Cart/>}/>
				</Routes>
			</div>
		</div>
	);
}

export default (App);
