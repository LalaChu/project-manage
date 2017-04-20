import { connect } from 'react-redux'
import * as UIAction from '../actions/components'
// import * as Status from '../constants/status'
import AllDaily from '../components/AllDaily'
import * as DailyAction from '../actions/daily'
// import * as ProjectAction from '../actions/project'

const mapStateToProps = (state, ownProps) => {
    const {DailyState} = state
    return {
        ...DailyState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDailyList: () => {
            dispatch(DailyAction.fetchAllDaily())
        } 
    }
}

const AllDailyContainer = connect(mapStateToProps ,mapDispatchToProps)(AllDaily)

export default AllDailyContainer
