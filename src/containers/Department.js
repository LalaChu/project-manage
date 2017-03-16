import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Department from '../components/Department'
import * as DepartmentAction from '../actions/department'

const mapStateToProps = (state, ownProps) => {
    // console.log('container:', state)
    const { ProjectState } = state
    const { status, list } = ProjectState
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDepartmentVisible: (visible, method) => {
            dispatch(UIType.setDepartmentVisible(visible, method))
        },
        addDepartment: (department) => {
            dispatch(DepartmentAction.fetchAddDepartment(department))}
    }
}

const DepartmentContainer = connect(mapStateToProps ,mapDispatchToProps)(Department)

export default DepartmentContainer
