import * as actions from "./action-types";

export function getProductCount() {
    return {
        type: actions.GET_PRODUCT_COUNT,
    }
}

export function setProductCount(cnt) {
    return {
        type: actions.SET_PRODUCT_COUNT,
        productCount: cnt
    }
}

export function getShortList() {
    return {
        type: actions.GET_SHORT_LIST,
    }
}

export function setShortList(item) {
    return {
        type: actions.SET_SHORT_LIST,
        item: item
    }
}

export function getList(index, display_mode, search) {
    return {
        type: actions.GET_LIST,
        index: index,
        display_mode: display_mode,
        search: search
    }
}

export function setList(list) {
    return {
        type: actions.SET_LIST,
        list: list
    }
}