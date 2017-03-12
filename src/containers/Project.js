import { connect } from 'react-redux'
import * as projectAction from '../actions/project'
import * as UIType from '../actions/components'
import * as Status from '../constants/status'
import Project from '../components/Project'

const mapStateToProps = (state, ownProps) => {
    console.log('container:', state)
    const { ProjectState } = state
    const { status, list } = ProjectState
    const {UIState : 
            {
                typeSelectVisible,
                addProjectVisible,
                addTaskVisible,
                addCategoryVisible
            } 
          } = state
    return {
        status,
        list,
        typeSelectVisible,
        addCategoryVisible,
        addProjectVisible,
        addTaskVisible
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProjectList: (e) => {
            dispatch(projectAction.fetchProjectList())
        },
        setTypeSelectVisible: (visible) => {
            dispatch(UIType.setPTypeSelectVisible(visible))
        },
        setAddProjectVisible: (visible) => {
            dispatch(UIType.setAddProjectVisible(visible))
        },
        setAddCategoryVisible: (visible) => {
            dispatch(UIType.setAddCategoryVisible(visible))
        },
        setAddTaskVisible: (visible) => {
            dispatch(UIType.setAddTaskVisible(visible))
        }
    }
}

const ProjectContainer = connect(mapStateToProps ,mapDispatchToProps)(Project)

export default ProjectContainer
