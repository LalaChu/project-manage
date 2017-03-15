import * as staffAction from '../constants/staff'

let initialState = {
    username: ''
}

const StaffState = (state = initialState, action ) => {
    switch (action.type) {
        case staffAction.LOGIN:
            return {
                ...state,
                username: action.username,
                status: action.status
            }
        
        default:
            return state
    }
}
export default StaffState
