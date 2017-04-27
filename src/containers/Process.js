import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Process from '../components/Process'
import * as TaskAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {ProjectState: {
        taskList
    }} = state
    return {
        taskList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTask: () => {
            dispatch(TaskAction.fetchTaskList())
        } 
    }
}

const ProcessContainer = connect(mapStateToProps ,mapDispatchToProps)(Process)

export default ProcessContainer
