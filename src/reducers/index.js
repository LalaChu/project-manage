import { combineReducers } from 'redux'
import UIState from './components'
import ProjectState from './project'
import StaffState from './staff'
import DepartmentState from './department'

const ProjectApp = combineReducers({
    UIState,
    ProjectState,
    StaffState,
    DepartmentState
})

export default ProjectApp
