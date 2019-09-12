import { call, put, takeLatest, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as dashboardActions from "../actions/dashboard-actions";
import * as rootActions from "../actions/root-actions";
import { Alert } from 'react-native'
import * as clients_json from '../assets/clients.json';
import funds_json from '../assets/funds.json';
function* getProductCount() {
    if (!funds_json || funds_json == [])
        yield put(dashboardActions.setProductCount(0));
    else {
        yield put(dashboardActions.setProductCount(Object.keys(funds_json).length))
    }
}
function* getSortedProductCount(action) {
    if (!funds_json || funds_json == [])
        yield put(dashboardActions.setSortedProductCount(0));
    else {
        let cnt = 0;
        for (let i = 0; i < Object.keys(funds_json).length; i++) {
            let item = funds_json[i];
            let mode = "";
            switch (action.display_mode) {
                case 1:
                    mode = "";
                    break;
                case 2:
                    mode = "HIGH Risk";
                    break;
                case 3:
                    mode = "LOW Risk";
                    break;
                default:
                    mode = "";
                    break;
            }
            if ((item.fundUSP + "").toUpperCase().includes(mode.toUpperCase()))
                cnt++;
        }
        yield put(dashboardActions.setSortedProductCount(cnt));
    }
}

function* getList(action) {
    if (!funds_json || funds_json == []) {
        yield put(dashboardActions.setList([]));
    }
    else {
        let cnt = (action.index + 1) * 10;
        let temp = [];
        for (let i = 0; i < Object.keys(funds_json).length; i++) {
            let item = funds_json[i];
            let mode = "";
            switch (action.display_mode) {
                case 1:
                    mode = "";
                    break;
                case 2:
                    mode = "HIGH Risk";
                    break;
                case 3:
                    mode = "LOW Risk";
                    break;
                default:
                    mode = "";
                    break;
            }
            if ((item.ticker + "").toUpperCase().includes((action.search + "").toUpperCase()) && (item.fundUSP + "").toUpperCase().includes(mode.toUpperCase()))
                temp.push(item);

            if (temp.length >= cnt)
                break;
        }
        yield put(dashboardActions.setList(temp));
    }
    yield put(rootActions.setLoading(false));
}

function* getShortList() {
    if (!funds_json || funds_json == [])
        yield put(dashboardActions.setShortList([]));
    else {
        let temp = [];
        for (let index = 0; index < 5; index++) {
            if (index == Object.keys(funds_json).length)
                break;

            temp.push(funds_json[index])
        }
        yield put(dashboardActions.setShortList(temp));
    }
}

export function* dashboardFlow() {
    yield takeLatest(actions.GET_PRODUCT_COUNT, getProductCount);
    yield takeLatest(actions.GET_SORTED_PRODUCT_COUNT, getSortedProductCount);
    yield takeLatest(actions.GET_SHORT_LIST, getShortList);
    yield takeLatest(actions.GET_LIST, getList);
}