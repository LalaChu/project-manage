import * as staffAction from '../constants/staff'

let initialState = {
    username: '',
    status: ''
}

const StaffState = (state = initialState, action ) => {
    switch (action.type) {
        case staffAction.LOGIN:
            return {
                ...state,
                username: action.username,
                status: action.status
            }
        case staffAction.LOGOUT:
            return {
                ...state,
                username: '',
                status: action.status
            }
        case staffAction.ADD_STAFF:
            return {
                ...state,
                status:action.status
            }
        default:
            return state
    }
}
export default StaffState
