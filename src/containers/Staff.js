import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Staff from '../components/Staff'
import * as StaffAction from '../actions/staff'
import * as DepartmentAction from '../actions/department'

const mapStateToProps = (state, ownProps) => {
    
    const {UIState : {
        staffVisible,
        method,
        record
    }, StaffState, DepartmentState: {
        list
    }} = state
    return {
        ...StaffState,
        staffVisible,
        method,
        departmentList: list,
        record
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addStaff: (staff, login) => {
            dispatch(StaffAction.fetchAddStaff(staff, false))
        },
        editStaff: (staff) => {
            dispatch(StaffAction.fetchEditStaff(staff))
        },
        fetchStaff: () => {
            dispatch(StaffAction.fetchStaff())
        },
        setStaffVisible: (visible, method, record) => {
            dispatch(UIType.setStaffVisible(visible, method, record))
            if(visible){
                dispatch(DepartmentAction.fetchDepartments())
            }

        },
        deleteStaff: (info) => {
            dispatch(StaffAction.fetchRemoveStaff(info))
        } 
    }
}

const StaffContainer = connect(mapStateToProps ,mapDispatchToProps)(Staff)

export default StaffContainer
