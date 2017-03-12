import * as UIType from '../constants/components'

export const setCurrentMenu = (currentMenu,openNow) => {
    
    return {
        type: UIType.SET_CURRENT_MENU,
        currentMenu,
        openNow
    }
}

export const setPTypeSelectVisible = (visible) => {
    return {
        type: UIType.SET_P_TYPE_SELECT_VISIBLE,
        typeSelectVisible: visible
    }
}

export const setAddProjectVisible = (visible) => {
    return {
        type: UIType.SET_ADD_PROJECT_VISIBLE,
        addProjectVisible: visible
    }
}

export const setAddCategoryVisible = (visible) => {
    return {
        type: UIType.SET_ADD_CATEGORY_VISIBLE,
        addCategoryVisible: visible
    }
}

export const setAddTaskVisible = (visible) => {
    return {
        type: UIType.SET_ADD_TASK_VISIBLE,
        addTaskVisible: visible
    }
}

