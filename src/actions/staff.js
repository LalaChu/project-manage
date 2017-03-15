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
                    if(response.url.indexOf('login') > 0){
                        dispatch(login(Status.ERROR, ''))
                    }else{
                        dispatch(login(Status.SUCCESS, username))
                        browserHistory.push('/view')
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

const logout = (status, username) => {
    return {
        type: StaffAction.LOGOUT,
        status,
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
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

const newStaff = (status) => {
    return {
        type: StaffAction.ADD_STAFF,
        status
    }
}
export const fetchAddStaff = (info) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(newStaff(Status.LOADING))
        return fetch('/addStaff',init)
                .then((response) => {
                    response.json().then(function(json){
                        if(json.result == 'success'){
                            dispatch(newStaff(Status.SUCCESS))
                        }else{
                            dispatch(newStaff(Status.ERROR))
                        }
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

