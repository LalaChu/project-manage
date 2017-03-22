import * as Status from '../constants/status'
import * as DocuemenAction from '../constants/document'

let initialState = {
    location: [],
    fileList:[],
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
        default:
            return state
    }
}
export default DepartmentState
