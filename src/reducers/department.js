import * as Status from '../constants/status'
import * as DepartmentAction from '../constants/department'

let initialState = {
    status: Status.LOADING,
    list: [],
    needFetch: true,
    msg: ''
}

const DepartmentState = (state = initialState, action ) => {
    switch (action.type) {
        case DepartmentAction.ADD_DEPARTMENT :
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
                msg: action.msg
            }
        case DepartmentAction.GET_DEPARTMENT: 
            return {
                ...state,
                status: action.status,
                list: action.list || [],
                needFetch: action.status === Status.SUCCESS ? false : true,
            }
        case DepartmentAction.EDIT_DEPARTMENT:
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
                msg: action.msg
            }
        case DepartmentAction.REMOVE_DEPARTMENT:
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
export default DepartmentState
