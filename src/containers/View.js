import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import View from '../components/View'
import * as StatsAction from '../actions/stats'
import * as ProjectAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {
            StatsState, 
            ProjectState: {
                myCheck,
                myTask
            }} = state
    let checkCount = myCheck.length
    let checkDone = 0
    myCheck.map(function(check){
        if(check.CheckState !== 'TOBEPREVIEWED'){
            checkDone++
        }
    })
    let taskCount = myTask.length
    let taskDone = 0
    myTask.map(function(task){
        if(task.state === 'DONE'){
            taskDone ++
        }
    })
    return {
        ...StatsState,
        checkCount,
        checkDone,
        taskCount,
        taskDone
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessage: () => {
            // console.log('dddd')
            dispatch(StatsAction.fetchMessage())
        },
        fetchStats: () => {
            dispatch(ProjectAction.fetchMyTaskList())
            dispatch(ProjectAction.fetchCheckList())
        }
    }
}

const ViewContainer = connect(mapStateToProps ,mapDispatchToProps)(View)

export default ViewContainer
