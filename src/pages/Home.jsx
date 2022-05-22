import React, { useCallback, useEffect } from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import { useDispatch, useSelector } from "react-redux"

import { setCategory, setSortBy } from "../redux/action/filters";
import { fetchPizzas } from "../redux/action/pizzas";
import { addPizzaToCart } from "../redux/action/cart";

const categoryNames = ["Meat", "Vegetarian", "Grilled", "Spicy", "Covered"];
const sortItems =[
    { name: "popularity", type: "popular", order: 'desc' },
    { name: "price", type: "price", order: 'desc' },
    { name: "alphabetically", type: "name", order: 'asc' }
]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    },[category, sortBy]);

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index));
    },[]);

    const onSelectSortType = useCallback((type) => {
        dispatch(setSortBy(type));
    },[]);

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: 'ADD_PIZZA_CART',
            payload: obj
        })
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortItems}
                    onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoaded ?
                        items.map(obj => (
                            <PizzaBlock
                                onClickAddPizza={handleAddPizzaToCart}
                                key={obj.id}
                                addedCount={cartItems[obj.id] && cartItems[obj.id].length}
                                {...obj}
                            />)
                        )
                        :
                        Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index}/>)
                }
            </div>
        </div>
    );
}

export default Home;