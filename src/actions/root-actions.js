import * as actions from "./action-types";

export function setLoading(isLoading) {
    return {
        type: actions.SET_LOADING,
        isLoading: isLoading
    }
}