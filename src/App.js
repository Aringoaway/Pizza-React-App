import './App.css';
import {Routes, Route} from "react-router-dom";
import {Header} from './components';
import {Home, Cart} from './pages';
import {useEffect, useState} from "react";

function App() {
    const [pizzas, setPizzas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/db.json')
            .then((resp) => resp.json())
            .then(json => {
            setPizzas(json.pizzas);
        });
    }, []);

    console.log(pizzas)

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/cart" element={<Cart/>} exact/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
