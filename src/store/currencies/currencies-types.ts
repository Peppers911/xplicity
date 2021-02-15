import { Action } from "redux";

export const FETCH_BITCOIN_PRICE_STARTED = "FETCH_BITCOIN_PRICE_STARTED";
export const FETCH_BITCOIN_PRICE_COMPLETED = "FETCH_BITCOIN_PRICE_COMPLETED";
export const FETCH_BITCOIN_PRICE_FAILED = "FETCH_BITCOIN_PRICE_FAILED";

export interface PriceInCurrency {
    code: string,
    description: string,
    symbol: string,
    rate: number,
}

export interface BitCoinPrices {
    lastUpdated: Date | "NEVER",
    isLoading: boolean,
    prices: PriceInCurrency[] | null,
    error: string | null,
}

interface FetchBitcoinPriceStarted extends Action {
    type: typeof FETCH_BITCOIN_PRICE_STARTED,
}

interface FetchBitcoinPriceCompleted extends Action {
    type: typeof FETCH_BITCOIN_PRICE_COMPLETED,
    payload: Partial<BitCoinPrices>,
}

interface FetchBitcoinPriceFailed extends Action {
    type: typeof FETCH_BITCOIN_PRICE_FAILED,
    payload: Partial<BitCoinPrices>,
}

export type BitcoinActionType = FetchBitcoinPriceStarted | FetchBitcoinPriceCompleted | FetchBitcoinPriceFailed;