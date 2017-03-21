import * as UIType from '../constants/components'

let initialState = {
    currentMenu: 'view',
    openNow: '',
    typeSelectVisible: false,
    addProjectVisible: false,
    addCategoryVisible: false,
    addTaskVisible: false,
    departmentVisible: false,
    staffVisible: false,
    method: '',
    record: ''
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
                addProjectVisible: action.addProjectVisible,
                method: action.method,
                record: action.record
            }
        case UIType.SET_ADD_CATEGORY_VISIBLE:
            return {
                ...state,
                addCategoryVisible: action.addCategoryVisible,
                method: action.method,
                record: action.record
            }
        case UIType.SET_ADD_TASK_VISIBLE:
            return {
                ...state,
                addTaskVisible: action.addTaskVisible,
                method: action.method,
                record: action.record
            }
        case UIType.SET_DEPARTMENT_VISIBLE:
            return {
                ...state,
                departmentVisible: action.departmentVisible,
                method: action.method,
                record: action.record
            }
        case UIType.SET_ADD_STAFF_VISIBLE:
            return {
                ...state,
                staffVisible: action.staffVisible,
                method: action.method,
                record: action.record
            }
        default:
            return state
    }
}
export default UIState
