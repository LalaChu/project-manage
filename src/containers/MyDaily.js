import { connect } from 'react-redux'
import * as UIAction from '../actions/components'
// import * as Status from '../constants/status'
import MyDaily from '../components/MyDaily'
import * as DailyAction from '../actions/daily'
import * as ProjectAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {UIState : {
        dailyVisible,
        method,
        record
    }, ProjectState: { taskList }} = state
    return {
        visible: dailyVisible,
        method,
        record,
        taskList
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDailyVisible: (visible, method, record) => {
            dispatch(UIAction.setDailyVisible(visible, method, record))
            if(visible){
                dispatch(ProjectAction.fetchTaskList())
            }
        },
        addDaily: (info) => {
            dispatch(DailyAction.fetchAddDaily(info))
        }
    }
}

const DailyContainer = connect(mapStateToProps ,mapDispatchToProps)(MyDaily)

export default DailyContainer
