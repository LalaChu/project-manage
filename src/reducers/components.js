import * as UIType from '../constants/components'

let initialState = {
    currentMenu: 'view',
    openNow: '',
    typeSelectVisible: false,
    addProjectVisible: false,
    addCategoryVisible: false,
    addTaskVisible: false
}

const UIState = (state = initialState, action ) => {
    switch (action.type) {
        case UIType.SET_CURRENT_MENU:
            return {
                ...state,
                currentMenu: action.currentMenu,
                openNow: action.openNow
            }
        case UIType.SET_P_TYPE_SELECT_VISIBLE:
            return {
                ...state,
                typeSelectVisible: action.typeSelectVisible
            }
        case UIType.SET_ADD_PROJECT_VISIBLE:
            return {
                ...state,
                addProjectVisible: action.addProjectVisible
            }
        case UIType.SET_ADD_CATEGORY_VISIBLE:
            return {
                ...state,
                addCategoryVisible: action.addCategoryVisible
            }
        case UIType.SET_ADD_TASK_VISIBLE:
            return {
                ...state,
                addTaskVisible: action.addTaskVisible
            }
        default:
            return state
    }
}
export default UIState
