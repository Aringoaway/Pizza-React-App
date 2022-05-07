import React, {useCallback, useEffect } from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import {useDispatch, useSelector} from "react-redux"

import { setCategory} from "../redux/action/filters";
import {fetchPizzas} from "../redux/action/pizzas";

const categoryNames = ["Meat", "Vegetarian", "Grilled", "Spicy", "Covered"];
const sortItems =[
    { name: "popularity", type: "popular"},
    { name: "price", type: "price"},
    {name: "alphabetically", type: "alphabetically"}
]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);

    useEffect(() => {
        dispatch(fetchPizzas());
    },[]);

    const onSelectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    },[])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickItem={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup items={sortItems}
                />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                {
                    isLoaded ?
                        items.map(obj => <PizzaBlock key={obj.id} isLoading={true} {...obj}/>)
                        :
                        Array(10).fill(<PizzaLoadingBlock/>)
                }
            </div>
        </div>
    );
}

export default Home;