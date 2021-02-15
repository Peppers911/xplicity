import { ThunkAction } from "redux-thunk";
import { RootState } from "../default";
import { failedBitcoinPrices, getBitcoinPrices, updateBitcoinPrices } from "./currencies-actions";
import { BitcoinActionType, PriceInCurrency } from "./currencies-types";
import jp from 'jsonpath';
import _ from "lodash";

export const loadBitCoinPrices = (): ThunkAction<void, RootState, unknown, BitcoinActionType> => async dispatch => {
    dispatch(getBitcoinPrices());
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');

        if (!response.ok)
            throw new Error("Failed to fetch prices");

        const data = await response.json();
        const updatedDate: string = _.first(jp.query(data, "$..time.updatedISO"));
        const prices: PriceInCurrency[] = jp.query(data, "$..bpi.*").map<PriceInCurrency>(item => {
            return {
                code: item.code,
                description: item.description,
                symbol: item.symbol,
                rate: item.rate_float,
            };
        });
        setTimeout(() => dispatch(updateBitcoinPrices(new Date(updatedDate), prices)), 1000);
    } catch (reason) {
        dispatch(failedBitcoinPrices(reason.message))
    }
}