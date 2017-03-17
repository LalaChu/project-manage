import * as StaffAction from '../constants/staff'
import * as Status from '../constants/status'
import * as UIAction from '../actions/components'

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

const newStaff = (status,msg) => {
    return {
        type: StaffAction.ADD_STAFF,
        status,
        msg
    }
}
export const fetchAddStaff = (info, login) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(newStaff(Status.LOADING, ''))
        return fetch('/addStaff',init)
                .then((response) => {
                    response.json().then(function(json){
                        if(json.result == 'success'){
                            dispatch(newStaff(Status.SUCCESS,'success'))
                            if(login){
                                dispatch(fetchLogin(info.telephone, info.password))
                            }else{
                                
                                dispatch(fetchStaff())
                                dispatch(newStaff('',''))
                                dispatch(UIAction.setStaffVisible(false))
                            }
                            
                            // browserHistory.push('/')
                        }else{
                            dispatch(newStaff(Status.ERROR,json.result.errmsg))
                            dispatch(newStaff('',''))
                            
                        }
                        
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

const editStaff = (status,msg) => {
    return {
        type: StaffAction.EDIT_STAFF,
        status,
        msg
    }
}
export const fetchEditStaff = (info) => {
    var init = {
        method: 'PUT',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(editStaff(Status.LOADING, ''))
        return fetch('/staff',init)
                .then((response) => {
                    response.json().then(function(json){
                        if(json.result == 'success'){
                            dispatch(editStaff(Status.SUCCESS,'success'))
                            // dispatch(fetchLogin(info.telephone, info.password))
                            // browserHistory.push
                        }else{
                            dispatch(editStaff(Status.ERROR,json.result.errmsg))
                            
                        }
                        dispatch(editStaff('',''))
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

const removeStaff = (status,msg) => {
    return {
        type: StaffAction.REMOVE_STAFF,
        status,
        msg
    }
}
export const fetchRemoveStaff = (info) => {
    var init = {
        method: 'DELETE',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(editStaff(Status.LOADING, ''))
        return fetch('/staff',init)
                .then((response) => {
                    response.json().then(function(json){
                        if(json.result == 'success'){
                            dispatch(removeStaff(Status.SUCCESS,'success'))
                            // dispatch(fetchLogin(info.telephone, info.password))
                            // browserHistory.push('/')
                        }else{
                            dispatch(removeStaff(Status.ERROR,json.result.errmsg))
                            
                        }
                        dispatch(removeStaff('',''))
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}

const getStaff = (status,list) => {
    return {
        type: StaffAction.FETCH_STAFF,
        status,
        list
    }
}
export const fetchStaff = (info) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(getStaff(Status.LOADING, ''))
        return fetch('/staff',init)
                .then((response) => {
                    response.json().then(function(json){
                        // if(json.result == 'success'){
                            dispatch(getStaff(Status.SUCCESS,json.result))
                            // dispatch(fetchLogin(info.telephone, info.password))
                            // browserHistory.push('/')
                        // }else{
                        //     dispatch(getStaff(Status.ERROR,json.result.errmsg))
                            
                        // }
                        // dispatch(getStaff('',''))
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}
