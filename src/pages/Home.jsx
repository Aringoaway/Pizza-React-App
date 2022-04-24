import React, {useCallback} from 'react';
import {Categories, SortPopup, PizzaBlock} from "../components";
import {useDispatch, useSelector} from "react-redux"

import { setCategory} from "../redux/action/filters";

const categoryNames = ["Meat", "Vegetarian", "Grilled", "Spicy", "Covered"];
const sortItems =[
    { name: "popularity", type: "popular"},
    { name: "price", type: "price"},
    {name: "alphabetically", type: "alphabetically"}
]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);

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
                    items && items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
                }
            </div>
        </div>
    );
}

export default Home;