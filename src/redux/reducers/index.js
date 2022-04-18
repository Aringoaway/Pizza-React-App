import { combineReducers } from 'redux'
import filtersReducers from './/filters'
import pizzasReducers from './pizzas'

const rootReducer = combineReducers({
    filters: filtersReducers,
    pizzas: pizzasReducers
});

export default rootReducer;