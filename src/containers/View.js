import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import View from '../components/View'
import * as StatsAction from '../actions/stats'

const mapStateToProps = (state, ownProps) => {
    const {StatsState} = state
    return {
        ...StatsState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessage: () => {
            // console.log('dddd')
            dispatch(StatsAction.fetchMessage())
        }
    }
}

const ViewContainer = connect(mapStateToProps ,mapDispatchToProps)(View)

export default ViewContainer
