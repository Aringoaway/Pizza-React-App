import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Routes, Route } from "react-router-dom";
import { setPizzas } from "./redux/action/pizzas";


function App() {
    const dispatch = useDispatch();
    const { items } = useSelector(({ pizzas, filters }) => {
        return {
            items: pizzas.items,
            sortBy: filters.sortBy
        }
    });

    useEffect(() => {
        axios.get('http://localhost:3000/db.json').then(({ data }) => {
            dispatch(setPizzas(data.pizzas));
        })
    },[]);
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" exact element={<Home items={items} />}/>
                    <Route path="/cart" exact element={<Cart />}/>
                </Routes>
            </div>
        </div>
    );
}

export default (App);
