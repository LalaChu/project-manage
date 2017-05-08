import { connect } from 'react-redux'
import { setCurrentMenu, openMenu } from '../actions/components'
import { fetchLogout, fetchCurUser } from '../actions/staff'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownProps) => {
    const { currentMenu, openNow } = ownProps
    const { StaffState: {user, needFetch}} = state
    return {
        currentMenu: currentMenu || 'view',
        openNow:openNow === '/' ? '' : openNow ,
        user,
        needFetch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (e) => {
            dispatch(fetchLogout())
        },
        getCurUser: () => {
            dispatch(fetchCurUser())
        }
    }
}

const SidebarContainer = connect(mapStateToProps ,mapDispatchToProps)(Sidebar)

export default SidebarContainer
                                 