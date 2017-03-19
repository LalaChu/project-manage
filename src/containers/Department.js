import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Department from '../components/Department'
import * as DepartmentAction from '../actions/department'
import * as StaffAction from '../actions/staff'

const mapStateToProps = (state, ownProps) => {
    // console.log('this is container ------------------:  ', state)
    const { DepartmentState, StaffState: {
        list
    } } = state
    const { method, departmentVisible, record } = state.UIState
    return {
        ...DepartmentState,
        method,
        departmentVisible,
        staffList: list,
        record
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setDepartmentVisible: (visible, method, record) => {
            console.log('this is container --------------------', record)
            dispatch(UIType.setDepartmentVisible(visible, method, record))
            if(visible){
                dispatch(StaffAction.fetchStaff())
            }
        },
        addDepartment: (department) => {
            dispatch(DepartmentAction.fetchAddDepartment(department))
        },
        fetchDepartment: () => {
            dispatch(DepartmentAction.fetchDepartments())
        },
        editDepartment: (department) => {
            dispatch(DepartmentAction.fetchEditDepartments(department))
        },
        delDepartment: (department) => {
            dispatch(DepartmentAction.fetchDelDepartment(department))
        }
    }
}

const DepartmentContainer = connect(mapStateToProps ,mapDispatchToProps)(Department)

export default DepartmentContainer
