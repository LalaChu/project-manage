import * as Status from '../constants/status'
import * as DailyAction from '../constants/daily'

let initialState = {
    date: '',
    dailyList:[],
    myDailyList: [],
    status:'',
    msg:'',
    needFetch:true,
    allNum: 0,
    dailyNum: 0
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
        case DailyAction.EDIT_DAILY:
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
                msg: action.msg
            }
        case DailyAction.GET_DAILY:
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.ERROR ? true : false,
                dailyList: action.allDailyList,
                date: action.date,
                dailyNum: action.dailyNum,
                allNum: action.allNum
            }
        default:
            return state
    }
}
export default DailyState
