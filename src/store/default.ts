import { createStore, applyMiddleware, combineReducers } from 'redux';
import { currenciesReducer } from './currencies/currencies-reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { analysisReducer } from './analysis/analysis-reducer';

const composedEnhancer = composeWithDevTools(
    // EXAMPLE: Add whatever middleware you actually want to use here
    applyMiddleware(thunk),
    // other store enhancers if any
);

const rootReducer = combineReducers({
    analysis: analysisReducer,
    currencies: currenciesReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composedEnhancer)
export default store