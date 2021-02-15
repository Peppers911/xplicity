import { BitcoinActionType, FETCH_BITCOIN_PRICE_COMPLETED, FETCH_BITCOIN_PRICE_FAILED, FETCH_BITCOIN_PRICE_STARTED, PriceInCurrency } from "./currencies-types";

export function getBitcoinPrices(): BitcoinActionType { return { type: FETCH_BITCOIN_PRICE_STARTED } }
export function failedBitcoinPrices(message: string): BitcoinActionType {
    return { type: FETCH_BITCOIN_PRICE_FAILED, payload: { error: message } }
}
export function updateBitcoinPrices(updated: Date, data: PriceInCurrency[]): BitcoinActionType {
    return { type: FETCH_BITCOIN_PRICE_COMPLETED, payload: { lastUpdated: updated, prices: data } }
}