import * as staffAction from '../constants/staff'

let initialState = {
    user: {},
    status: '',
    list: [],
    msg: ''
}

const StaffState = (state = initialState, action ) => {
    switch (action.type) {
        case staffAction.LOGIN:
            return {
                ...state,
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
        case staffAction.GET_CUR_USER:
            return {
                ...state,
                status: action.status,
                user: action.user
            }
        default:
            return state
    }
}
export default StaffState
