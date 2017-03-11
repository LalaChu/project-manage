import { combineReducers } from 'redux'
import UIState from './components'
import ProjectState from './project'

const ProjectApp = combineReducers({
    UIState,
    ProjectState
})

export default ProjectApp
