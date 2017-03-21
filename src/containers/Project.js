import { connect } from 'react-redux'
import * as projectAction from '../actions/project'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Project from '../components/Project'
import * as StaffAction from '../actions/staff'

const mapStateToProps = (state, ownProps) => {
    // console.log('container:', state)
    let { ProjectState, StaffState:{list} } = state
    const staffList = list
    const {UIState : 
            {
                typeSelectVisible,
                addProjectVisible,
                addTaskVisible,
                addCategoryVisible,
                method,
                record
            } 
          } = state
    return {
        ...ProjectState,
        typeSelectVisible,
        addCategoryVisible,
        addProjectVisible,
        addTaskVisible,
        method,
        record,
        staffList,
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
        setAddProjectVisible: (visible, method, record) => {
            dispatch(UIType.setAddProjectVisible(visible, method, record))
        },
        setAddCategoryVisible: (visible, method, record) => {
            dispatch(UIType.setAddCategoryVisible(visible, method, record))
        },
        setAddTaskVisible: (visible, method, record) => {
            dispatch(UIType.setAddTaskVisible(visible, method, record))
        },
        getStaff: () => {
            dispatch(StaffAction.fetchStaff())
        },
        addProject: (info) => {
            dispatch(projectAction.fetchAddProject(info))
        },
        editProject: (info) => {
            dispatch(projectAction.fetchEditProject(info))
        },
        addTask: (info) => {
            dispatch(projectAction.fetchAddTask(info))
        },
        editTask: (info) => {
            dispatch(projectAction.fetchEditTask(info))
        },
        removeProject: (info) => {
            dispatch(projectAction.fetchRemoveProject(info))
        },
        removeTask: (info) => {
            dispatch(projectAction.fetchRemoveTask(info))
        }
    }
}

const ProjectContainer = connect(mapStateToProps ,mapDispatchToProps)(Project)

export default ProjectContainer
