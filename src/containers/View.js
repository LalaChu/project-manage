import { connect } from 'react-redux'
import * as UIType from '../actions/components'
import moment from 'moment'
// import * as Status from '../constants/status'
import View from '../components/View'
import * as StatsAction from '../actions/stats'
import * as ProjectAction from '../actions/project'
import * as DailyAction from '../actions/daily'

const mapStateToProps = (state, ownProps) => {
    const {
            StatsState, 
            DailyState:{
                myDailyList
            },
            ProjectState: {
                myCheck,
                myTask
            }} = state
    let isTodayPosted = 0
    myDailyList.map(function(daily){
        if(moment(daily.date).isSame(moment(new Date()), 'day')){
            isTodayPosted = 1
        }
    })
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
        taskDone,
        myTask,
        isTodayPosted
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
            dispatch(DailyAction.fetchMyDaily())
        }
    }
}

const ViewContainer = connect(mapStateToProps ,mapDispatchToProps)(View)

export default ViewContainer
