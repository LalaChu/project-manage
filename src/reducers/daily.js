import * as Status from '../constants/status'
import * as DailyAction from '../constants/daily'

let initialState = {
    date: '',
    dailyList:[],
    myDailyList: [],
    status:'',
    msg:'',
    needFetch:true 
}

const DailyState = (state = initialState, action ) => {
    switch (action.type) {
        case DailyAction.ADD_DAILY :
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
                msg: action.msg
            }
        case DailyAction.GET_MY_DAILY: 
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.ERROR ? true : false,
                myDailyList: action.myDailyList
            }
        case DailyAction.DELETE_DAILY_FILE:
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
                msg: action.msg
            }
        default:
            return state
    }
}
export default DailyState
