import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Personal from '../components/Personal'
import * as StaffAction from '../actions/staff'

const mapStateToProps = (state, ownProps) => {
    const {
        StaffState:{
            user,
            needFetch
        }
    } = state
    return {
        user,
        needFetch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUpdateStaff: (info) => {
            dispatch(StaffAction.fetchEditStaff(info))
        } 
    }
}

const PersonalContainer = connect(mapStateToProps ,mapDispatchToProps)(Personal)

export default PersonalContainer
