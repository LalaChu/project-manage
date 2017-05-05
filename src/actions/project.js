import * as Status from '../constants/status'
import * as projectAction from '../constants/project' 
import 'whatwg-fetch'
import { secretKey } from '../constants/key'
import * as UIAction from './components'

const getProjectList = (status, list) => {
    return {
        type: projectAction.GET_PROJECT_LIST,
        status,
        list: list || []
    }
}

export const fetchProjectList = () => {
    return function(dispatch){
        dispatch(getProjectList(Status.LOADING))
        var init = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/projectList',init)
                .then((response) => { return response.json()})
                .then(json =>{ dispatch(getProjectList(Status.SUCCESS, json.result))})
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const addProject = (status, msg) => {
    return {
        type: projectAction.ADD_PROJECT,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchAddProject = (info) => {
    return function(dispatch){
        dispatch(addProject(Status.LOADING, ''))
        var init = {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/project',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(addProject(Status.SUCCESS, 'success'))
                    dispatch(addProject('', ''))
                    dispatch(UIAction.setAddProjectVisible(false))
                    dispatch(UIAction.setAddCategoryVisible(false))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const editProject = (status, msg) => {
    return {
        type: projectAction.EDIT_PROJECT,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchEditProject = (info) => {
    return function(dispatch){
        dispatch(editProject(Status.LOADING, ''))
        var init = {
            method: 'PUT',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/project',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(editProject(Status.SUCCESS, 'success'))
                    dispatch(editProject('', ''))
                    dispatch(UIAction.setAddProjectVisible(false))
                    dispatch(UIAction.setAddCategoryVisible(false))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const removeProject = (status, msg) => {
    return {
        type: projectAction.REMOVE_PROJECT,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchRemoveProject = (info) => {
    return function(dispatch){
        dispatch(removeProject(Status.LOADING, ''))
        var init = {
            method: 'DELETE',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/project',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(removeProject(Status.SUCCESS, 'success'))
                    dispatch(removeProject('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const addTask= (status, msg) => {
    return {
        type: projectAction.ADD_TASK,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchAddTask = (info) => {
    return function(dispatch){
        dispatch(addTask(Status.LOADING, ''))
        var init = {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/task',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(addTask(Status.SUCCESS, 'success'))
                    dispatch(addTask('', ''))
                    dispatch(UIAction.setAddTaskVisible(false))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const editTask = (status, msg) => {
    return {
        type: projectAction.EDIT_TASK,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchEditTask = (info) => {
    return function(dispatch){
        dispatch(editTask(Status.LOADING, ''))
        var init = {
            method: 'PUT',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/task',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(editTask(Status.SUCCESS, 'success'))
                    dispatch(editTask('', ''))
                    dispatch(UIAction.setAddTaskVisible(false))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const removeTask = (status, msg) => {
    return {
        type: projectAction.REMOVE_TASK,
        status,
        msg,
        needFetch: msg === 'success' ? true : false
    }
}

export const fetchRemoveTask = (info) => {
    return function(dispatch){
        dispatch(removeTask(Status.LOADING, ''))
        var init = {
            method: 'DELETE',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/task',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(removeTask(Status.SUCCESS, 'success'))
                    dispatch(removeTask('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const getTask = (status, list) => {
    return {
        type: projectAction.GET_TASK,
        status,
        taskList: list
    }
}

export const fetchTaskList = (info) => {
    return function(dispatch){
        dispatch(getTask(Status.LOADING, []))
        var init = {
            method: 'post',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/taskList',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(getTask(Status.SUCCESS, json.result))
                    // dispatch(getTask('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const getMyTask = (status, list) => {
    return {
        type: projectAction.GET_MY_TASK,
        status,
        myTask: list
    }
}

export const fetchMyTaskList = (info) => {
    return function(dispatch){
        dispatch(getMyTask(Status.LOADING, []))
        var init = {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/myTask',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(getMyTask(Status.SUCCESS, json.result))
                    // dispatch(getTask('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const getMyCheck = (status, list) => {
    return {
        type: projectAction.GET_MY_CHECK,
        status,
        myCheck: list
    }
}

export const fetchCheckList = (info) => {
    return function(dispatch){
        dispatch(getMyCheck(Status.LOADING, []))
        var init = {
            method: 'post',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/checkList',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(getMyCheck(Status.SUCCESS, json.result))
                    // dispatch(getTask('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const startCheck = (status, msg) => {
    return {
        type: projectAction.START_CHECK,
        status,
        msg,
    }
}

export const fetchStartCheck = (info) => {
    return function(dispatch){
        dispatch(startCheck(Status.LOADING, ''))
        var init = {
            method: 'post',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/taskStartCheck',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(startCheck(Status.SUCCESS, 'success'))
                    dispatch(startCheck('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

const checkTask = (status, msg) => {
    return {
        type: projectAction.CHECK_TASK,
        status,
        msg,
    }
}

export const fetchCheckTask = (info) => {
    return function(dispatch){
        dispatch(checkTask(Status.LOADING, ''))
        var init = {
            method: 'post',
            body: JSON.stringify(info),
            headers: {'Content-Type': 'application/json'},
            redirect: 'follow'
        }
        return fetch('/taskReview',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(checkTask(Status.SUCCESS, 'success'))
                    dispatch(checkTask('', ''))
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}
