import { connect } from 'react-redux'
import { setCurrentMenu } from '../actions/components'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownProps) => {
    const { currentMenu } = ownProps
    return {
        currentMenu: currentMenu || 'view'
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (e) => {
            dispatch(setCurrentMenu(e.key))
        }
    }
}

const SidebarContainer = connect(mapStateToProps ,mapDispatchToProps)(Sidebar)

export default SidebarContainer
