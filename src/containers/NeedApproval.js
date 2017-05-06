import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import NeedApproval from '../components/NeedApproval'
import * as TaskAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {ProjectState: {
        myCheck,
        needFetch
    }} = state
    return {
        myCheck,
        needFetch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: () => {
            dispatch(TaskAction.fetchCheckList())
        },
        fetchCheckTask: (info) => {
            dispatch(TaskAction.fetchCheckTask(info))
        }
    }
}

const ApprovalContainer = connect(mapStateToProps ,mapDispatchToProps)(NeedApproval)

export default ApprovalContainer
