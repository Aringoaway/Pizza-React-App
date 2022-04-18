import {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";

import './App.css';
import {Header} from './components';
import {Home, Cart} from './pages';
import {Routes, Route} from "react-router-dom";
import {setPizzas} from "./redux/action/pizzas";

function App() {
    const [pizzas, setPizzas] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/db.json').then(({ data }) => {
            setPizzas(data.pizzas);
        })
    }, []);


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" exact element={<Home items={pizzas} />}/>
                    <Route path="/cart" exact element={<Cart />}/>
                </Routes>
            </div>
        </div>
    );
}

export default connect()(App);
