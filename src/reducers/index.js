import { combineReducers } from 'redux'
import UIState from './components'
import ProjectState from './project'
import StaffState from './staff'
import DepartmentState from './department'
import DocumentState from './document'

const ProjectApp = combineReducers({
    UIState,
    ProjectState,
    StaffState,
    DepartmentState,
    DocumentState
})

export default ProjectApp
