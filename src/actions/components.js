import * as UIType from '../constants/components'

export const setCurrentMenu = (currentMenu) => {
    return {
        type: UIType.SET_CURRENT_MENU,
        currentMenu
    }
}

export const setPTypeSelectVisible = (visible) => {
    return {
        type: UIType.SET_P_TYPE_SELECT_VISIBLE,
        typeSelectVisible: visible
    }
}
