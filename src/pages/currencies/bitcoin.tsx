import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Alert, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadBitCoinPrices } from "../../store/currencies/currencies-thunks";
import { RootState } from "../../store/default";


function Bitcoin(): JSX.Element {
    const dispatch = useDispatch();
    useEffect(() => {
        const interval = setInterval(() => dispatch(loadBitCoinPrices()), 10000);
        dispatch(loadBitCoinPrices())
        return () => clearInterval(interval);
    }, [dispatch]);

    const bitCoinStonks = useSelector((state: RootState) => state.currencies);
    const [orderByProp, setOrderBy] = useState('code');
    const [isAscending, setAscendingOrder] = useState(true)

    const arrow = isAscending ? '↓' : '↑';

    return (<>
        {bitCoinStonks.error !== null && (<Alert variant="danger">Last updated failed with error: {bitCoinStonks.error}</Alert>)}
        {bitCoinStonks.isLoading && (<div><Spinner animation="border" role="status"></Spinner> Loading...</div>)}
        <Row>
            {bitCoinStonks.lastUpdated !== 'NEVER' && (<div>Last updated: {bitCoinStonks.lastUpdated.toLocaleString()}</div>)}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => orderByProp != 'code' ? setOrderBy('code') : setAscendingOrder(!isAscending)}>Currency{orderByProp == 'code' && arrow}</th>
                        <th onClick={() => orderByProp != 'rate' ? setOrderBy('rate') : setAscendingOrder(!isAscending)}>Rate{orderByProp == 'rate' && arrow}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _.orderBy(bitCoinStonks.prices, [orderByProp], [isAscending ? 'asc' : 'desc']).map(value => (<tr key={value.code}>
                            <td>{value.code}</td>
                            <td>{value.rate}</td>
                        </tr>))
                    }
                </tbody>
            </Table>
        </Row>
    </>
    );
}

export default Bitcoin;