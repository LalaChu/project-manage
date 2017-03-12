import { connect } from 'react-redux'
import * as projectAction from '../actions/project'
import * as UIType from '../actions/components'
import * as Status from '../constants/status'
import Project from '../components/Project'

const mapStateToProps = (state, ownProps) => {
    console.log('container:', state)
    const { ProjectState } = state
    const { status, list } = ProjectState
    const {UIState : {typeSelectVisible} } = state
    return {
        status,
        list,
        typeSelectVisible
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectList: (e) => {
            dispatch(projectAction.fetchProjectList())
        },
        setTypeSelectVisible: (visible) => {
            dispatch(UIType.setPTypeSelectVisible(visible))
        }
    }
}

const ProjectContainer = connect(mapStateToProps ,mapDispatchToProps)(Project)

export default ProjectContainer
