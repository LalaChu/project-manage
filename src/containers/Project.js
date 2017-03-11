import { connect } from 'react-redux'
import * as projectAction from '../actions/project'
import * as Status from '../constants/status'
import Project from '../components/Project'

const mapStateToProps = (state, ownProps) => {
    const { ProjectState } = state
    const { status, list } = ProjectState
    return {
        status,
        list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectList: (e) => {
            dispatch(projectAction.fetchProjectList())
        }
    }
}

const ProjectContainer = connect(mapStateToProps ,mapDispatchToProps)(Project)

export default ProjectContainer
