import * as Status from '../constants/status'
import * as StatsAction from '../constants/stats'

let initialState = {
    messageList: [],
    needFetch: true,
}

const StatsState = (state = initialState, action ) => {
    switch (action.type) {
        case StatsAction.GET_MESSAGE :
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.ERROR ? true : false,
                messageList: action.list
            }
        default:
            return state
    }
}
export default StatsState
