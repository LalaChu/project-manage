import * as staffAction from '../constants/staff'

let initialState = {
    username: '',
    status: '',
    list: [],
    msg: ''
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
                status:action.status,
                msg: action.msg
            }
        case staffAction.EDIT_STAFF:
            return {
                ...state,
                status: action.status,
                msg: action.msg
            }
        case staffAction.FETCH_STAFF:
            return {
                ...state,
                status: action.status,
                list: action.list || [],
                msg: ''
            }
        case staffAction.REMOVE_STAFF:
            return {
                ...state,
                status: action.status,
                msg: action.msg
            }
        default:
            return state
    }
}
export default StaffState
