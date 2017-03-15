import { combineReducers } from 'redux'
import UIState from './components'
import ProjectState from './project'
import StaffState from './staff'

const ProjectApp = combineReducers({
    UIState,
    ProjectState,
    StaffState
})

export default ProjectApp
