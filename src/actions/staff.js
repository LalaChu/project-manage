import * as StaffAction from '../constants/staff'
import * as Status from '../constants/status'

import { browserHistory } from 'react-router'




const login = (status, username) => {
    return {
        type: StaffAction.LOGIN,
        status,
        username
    }
}

const logout = (status, username) => {
    return {
        type: StaffAction.LOGOUT,
        status,
    }
}

export const fetchLogin = (username, password) => {
    let info = {
        username,
        password
    }
    var init = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(login(Status.LOADING))
        return fetch('/login',init)
                .then((response) => {
                    // browserHistory.push('/view')
                    console.log('response', response)
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

export const fetchLogout = (username, password) => {
    var init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(logout(Status.LOADING))
        return fetch('/logout',init)
                .then((response) => {
                    dispatch(logout(Status.SUCCESS))
                    browserHistory.push('/login')
                    console.log('response', response)
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}



