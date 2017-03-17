import { connect } from 'react-redux'
import { fetchAddStaff } from '../actions/staff'
import Register from '../components/Register'

const mapStateToProps = (state, ownProps) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (info) => {
            dispatch(fetchAddStaff(info, true))
        }
    }
}

const RegisterContainer = connect(mapStateToProps ,mapDispatchToProps)(Register)

export default RegisterContainer
