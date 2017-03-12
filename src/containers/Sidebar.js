import { connect } from 'react-redux'
import { setCurrentMenu } from '../actions/components'
import Sidebar from '../components/Sidebar'

const mapStateToProps = (state, ownProps) => {
    // console.log(state , ownProps)
    const { currentMenu, openNow } = ownProps
    return {
        currentMenu: currentMenu || 'view',
        openNow:openNow === '/' ? '' : openNow 
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (e) => {
            // console.log(e)
            let opennow = e.keyPath[e.keyPath.length-1]
            dispatch(setCurrentMenu(e.key, opennow))
        }
    }
}

const SidebarContainer = connect(mapStateToProps ,mapDispatchToProps)(Sidebar)

export default SidebarContainer
                                 