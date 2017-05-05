import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import StartApproval from '../components/StartApproval'
import * as TaskAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {ProjectState: {
        myTask,
        needFetch
    }} = state
    return {
        myTask,
        needFetch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: () => {
            dispatch(TaskAction.fetchMyTaskList())
        },
        startCheck: (info) => {
            dispatch(TaskAction.fetchStartCheck(info))
        }
    }
}

const StartContainer = connect(mapStateToProps ,mapDispatchToProps)(StartApproval)

export default StartContainer
