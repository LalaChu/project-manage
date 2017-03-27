import { connect } from 'react-redux'
import * as DocumentAction from '../actions/document'
import * as UIAction from '../actions/components'
import Document from '../components/Document'


const mapStateToProps = (state, ownProps) => {
    const { DocumentState, StaffState: {user, list}, UIState: {folderVisible, method, record} } = state
    return {
        ...DocumentState,
        user,
        folderVisible,
        method, 
        record,
        staffList: list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFiles: (location) => {
            dispatch(DocumentAction.fetchFiles(location))
        },
        setFolderVisible: (visible, method, record) => {
            dispatch(UIAction.setFolderVisible(visible, method, record))
        },
        addFolder: (info) => {
            dispatch(DocumentAction.fetchAddFolder(info))
        }
    }
}

const DocumentContainer = connect(mapStateToProps ,mapDispatchToProps)(Document)

export default DocumentContainer
