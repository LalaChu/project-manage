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
        default:
            return state
    }
}
export default ProjectState
