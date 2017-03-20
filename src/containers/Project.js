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
        setAddCategoryVisible: (visible) => {
            dispatch(UIType.setAddCategoryVisible(visible))
        },
        setAddTaskVisible: (visible) => {
            dispatch(UIType.setAddTaskVisible(visible))
        },
        addProject: (info) => {
            dispatch(projectAction.fetchAddProject(info))
            
        },
        getStaff: () => {
            dispatch(StaffAction.fetchStaff())
        }
    }
}

const ProjectContainer = connect(mapStateToProps ,mapDispatchToProps)(Project)

export default ProjectContainer
