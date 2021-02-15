import { BitCoinPrices, BitcoinActionType, FETCH_BITCOIN_PRICE_COMPLETED, FETCH_BITCOIN_PRICE_FAILED, FETCH_BITCOIN_PRICE_STARTED } from "./currencies-types";

const initialState: BitCoinPrices = {
    lastUpdated: "NEVER",
    isLoading: true,
    error: null,
    prices: null,
};

export function currenciesReducer(state = initialState, action: BitcoinActionType): BitCoinPrices {
    switch (action.type) {
        case FETCH_BITCOIN_PRICE_STARTED:
            return { ...state, isLoading: true };
        case FETCH_BITCOIN_PRICE_FAILED:
        case FETCH_BITCOIN_PRICE_COMPLETED:
            return { ...state, ...action.payload, isLoading: false };
        default: return state;
    }
}