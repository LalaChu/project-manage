import { connect } from 'react-redux'
import * as UIType from '../actions/components'
// import * as Status from '../constants/status'
import Staff from '../components/Staff'
import * as StaffAction from '../actions/staff'
import * as DepartmentAction from '../actions/department'

const mapStateToProps = (state, ownProps) => {
    
    const {UIState : {
        staffVisible,
        method
    }, StaffState, DepartmentState: {
        list
    }} = state
    console.log('---------------this is staff state',StaffState)
    return {
        ...StaffState,
        staffVisible,
        method,
        departmentList: list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addStaff: (staff, login) => {
            dispatch(StaffAction.fetchAddStaff(staff, false))
        },
        fetchStaff: () => {
            dispatch(StaffAction.fetchStaff())
        },
        setStaffVisible: (visible, method) => {
            dispatch(UIType.setStaffVisible(visible, method))
            if(visible){
                dispatch(DepartmentAction.fetchDepartments())
            }

        }
    }
}

const StaffContainer = connect(mapStateToProps ,mapDispatchToProps)(Staff)

export default StaffContainer
