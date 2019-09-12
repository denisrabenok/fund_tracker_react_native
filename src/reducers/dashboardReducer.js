import * as actions from "../actions/action-types";

export default function dashboardReducer(state, action = {}) {
    switch (action.type) {
        case actions.SET_LIST:
            return state.withMutations(state => {
                state
                    .set('list', action.list)
            });
        case actions.SET_PRODUCT_COUNT:
            return state.withMutations(state => state
                .set('productCount', action.productCount));
        case actions.SET_SORTED_PRODUCT_COUNT:
            return state.withMutations(state => state
                .set('sortedProductCount', action.sortedProductCount));
        case actions.SET_SHORT_LIST:
            return state.withMutations(state => {
                let shortList = state.get('shortList');
                if (!shortList || shortList == []) {
                    shortList = [];
                    shortList.push(action.item);
                }
                else {
                    let found = false;
                    for (let i = 0; i < shortList.length; i++) {
                        if (shortList[i].ticker == action.item.ticker) {
                            found = true;
                            shortList.splice(i, 1);
                            break;
                        }
                    }
                    if (!found)
                        shortList.push(action.item);
                }
                state.set('shortList', shortList)
            })
        default:
            return state
    }
}