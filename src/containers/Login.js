import { connect } from 'react-redux'
import { fetchLogin } from '../actions/staff'
import Login from '../components/Login'

const mapStateToProps = (state, ownProps) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => {
            dispatch(fetchLogin(username, password))
        },
        onOpenChange: (menu,key) => {
            
        }
    }
}

const LoginContainer = connect(mapStateToProps ,mapDispatchToProps)(Login)

export default LoginContainer
