import { combineReducers } from 'redux'
import UIState from './components'
import ProjectState from './project'
import StaffState from './staff'
import DepartmentState from './department'
import DocumentState from './document'
import DailyState from './daily'
import StatsState from './stats'

const ProjectApp = combineReducers({
    UIState,
    ProjectState,
    StaffState,
    DepartmentState,
    DocumentState,
    DailyState,
    StatsState
})

export default ProjectApp
