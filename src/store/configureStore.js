import { autoRehydrate, persistStore } from "redux-persist-immutable";
import { combineReducers } from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import Immutable from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
import dashboardReducer from "../reducers/dashboardReducer";
import rootReducer from "../reducers/rootReducer"
import createSagaMiddleware from "redux-saga";

import * as  dashboardSaga from "../saga/dashboard-saga";


const combinedReducers = combineReducers({
    dashboard: dashboardReducer,
    root: rootReducer
});

const initialState = new Immutable.Map({
    dashboard: Immutable.Map({
        productCount: 0,
        shortList: [],
        list: []
    }),
    root: Immutable.Map({
        isLoading: true
    })
});

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combinedReducers,
        initialState,
        compose(applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)), autoRehydrate({ log: true }))
    );

    persistStore(
        store,
        {
            storage: AsyncStorage,
            blacklist: ['root'],
        }
    );
    return {
        ...store, runSaga: [
            sagaMiddleware.run(dashboardSaga.dashboardFlow)
        ]
    };
}