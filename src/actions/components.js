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

export const setAddProjectVisible = (visible, method, record) => {
    return {
        type: UIType.SET_ADD_PROJECT_VISIBLE,
        addProjectVisible: visible,
        method,
        record
    }
}

export const setAddCategoryVisible = (visible, method, record) => {
    return {
        type: UIType.SET_ADD_CATEGORY_VISIBLE,
        addCategoryVisible: visible,
        method,
        record
    }
}

export const setAddTaskVisible = (visible, method, record) => {
    return {
        type: UIType.SET_ADD_TASK_VISIBLE,
        addTaskVisible: visible,
        method,
        record
    }
}

export const setDepartmentVisible = (visible, method, record) => {
    return {
        type: UIType.SET_DEPARTMENT_VISIBLE,
        departmentVisible: visible,
        method,
        record,
    }
}

export const setStaffVisible = (visible, method, record) => {
    return {
        type: UIType.SET_ADD_STAFF_VISIBLE,
        staffVisible: visible,
        method,
        record
    }
}

export const setDailyVisible = (visible, method, record) => {
    return {
        type: UIType.SET_DAILY_VISIBLE,
        dailyVisible: visible,
        method,
        record
    }
}
