import * as UIType from '../constants/components'

export const setCurrentMenu = (currentMenu) => {
    return {
        type: UIType.SET_CURRENT_MENU,
        currentMenu
    }
}
