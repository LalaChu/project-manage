import { connect } from 'react-redux'
import * as DocumentAction from '../actions/document'
import Document from '../components/Document'

const mapStateToProps = (state, ownProps) => {
    const { DocumentState } = state
    return {
        ...DocumentState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFiles: (location) => {
            dispatch(DocumentAction.fetchFiles(location))
        }
    }
}

const DocumentContainer = connect(mapStateToProps ,mapDispatchToProps)(Document)

export default DocumentContainer
