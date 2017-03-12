import * as UIType from '../constants/components'

let initialState = {
    currentMenu: 'view'
}

const UIState = (state = initialState, action ) => {
    switch (action.type) {
        case UIType.SET_CURRENT_MENU:
            return {
                ...state,
                currentMenu: action.currentMenu
            }
        case UIType.SET_P_TYPE_SELECT_VISIBLE:
            return {
                ...state,
                typeSelectVisible: action.typeSelectVisible
            }
        default:
            return state
    }
}
export default UIState
