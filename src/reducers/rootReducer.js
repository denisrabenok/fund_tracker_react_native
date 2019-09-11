import * as actions from "../actions/action-types";

export default function rootReducer(state, action = {}) {
    switch (action.type) {
        case actions.SET_LOADING:
            return state.withMutations(state => {
                state
                    .set('isLoading', action.isLoading)
            });
        default:
            return state
    }
}