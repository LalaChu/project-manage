import * as Status from '../constants/status'
import * as projectAction from '../constants/project'

let initialState = {
    status: Status.LOADING,
    list: [],
    msg: ''
}

const ProjectState = (state = initialState, action ) => {
    switch (action.type) {
        case projectAction.GET_PROJECT_LIST:
            return {
                ...state,
                status: action.status,
                list: action.list
            }
        case projectAction.ADD_PROJECT:
            return {
                ...state,
                status: action.status,
                msg: action.msg
            }
        default:
            return state
    }
}
export default ProjectState
