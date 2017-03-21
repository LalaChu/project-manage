import * as Status from '../constants/status'
import * as projectAction from '../constants/project'

let initialState = {
    status: Status.LOADING,
    list: [],
    needFetch: true,
    msg: ''
}

const ProjectState = (state = initialState, action ) => {
    switch (action.type) {
        case projectAction.GET_PROJECT_LIST:
            return {
                ...state,
                status: action.status,
                list: action.list,
                needFetch: action.status === Status.SUCCESS ? false : true
            }
        case projectAction.ADD_PROJECT:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false 
            }
        case projectAction.EDIT_PROJECT:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false
            }
        case projectAction.REMOVE_PROJECT:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false
            }
        case projectAction.ADD_TASK:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false 
            }
        case projectAction.EDIT_TASK:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false
            }
        case projectAction.REMOVE_TASK:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.msg === 'success' ? true : false
            }
        case projectAction.GET_TASK: 
            return {
                ...state,
                status: action.status,
                taskList: action.taskList
            }
        default:
            return state
    }
}
export default ProjectState
