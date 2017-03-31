import * as Status from '../constants/status'
import * as DocuemenAction from '../constants/document'

let initialState = {
    location: '',
    fileList:[],
    folderTree: [],
    status:'',
    msg:'',
    needFetch:true 
}

const DepartmentState = (state = initialState, action ) => {
    switch (action.type) {
        case DocuemenAction.GET_CUR_FILE :
            return {
                ...state,
                status: action.status,
                needFetch: action.status === Status.ERROR ? true : false,
                fileList: action.list
            }
        case DocuemenAction.ADD_DIR:
            return {
                ...state,
                msg: action.msg,
                status: action.status,
                needFetch: action.status === Status.SUCCESS ? true : false,
            }
        case DocuemenAction.SET_CUR_LOCATION:
            return {
                ...state,
                location: action.location
            }
        case DocuemenAction.GET_FOLDER_TREE: 
            return {
                ...state,
                status: action.status,
                folderTree: action.list
            }
        case DocuemenAction.EDIT_DIR:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.status === Status.SUCCESS ? true : false,
            }
        case DocuemenAction.REMOVE_DIR:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.status === Status.SUCCESS ? true : false
            }
        case DocuemenAction.EDIT_FILE:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.status === Status.SUCCESS ? true : false
            }
        case DocuemenAction.REMOVE_FILE:
            return {
                ...state,
                status: action.status,
                msg: action.msg,
                needFetch: action.status === Status.SUCCESS ? true : false
            }
        default:
            return state
    }
}
export default DepartmentState
