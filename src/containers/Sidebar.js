import { connect } from 'react-redux'
import { setCurrentMenu, openMenu } from '../actions/components'
import { fetchLogout } from '../actions/staff'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownProps) => {
    const { currentMenu, openNow } = ownProps
    return {
        currentMenu: currentMenu || 'view',
        openNow:openNow === '/' ? '' : openNow 
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (e) => {
            console.log('tets')
            dispatch(fetchLogout())
        },
        onOpenChange: (menu,key) => {
            
        }
    }
}

const SidebarContainer = connect(mapStateToProps ,mapDispatchToProps)(Sidebar)

export default SidebarContainer
                                 