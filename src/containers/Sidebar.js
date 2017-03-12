import { connect } from 'react-redux'
import { setCurrentMenu, openMenu } from '../actions/components'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    const { currentMenu, openNow } = ownProps
    return {
        currentMenu: currentMenu || '',
        openNow:openNow === '/' ? '' : openNow 
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (e) => {
            
        },
        onOpenChange: (menu,key) => {
            
        }
    }
}

const SidebarContainer = connect(mapStateToProps ,mapDispatchToProps)(Sidebar)

export default SidebarContainer
                                 