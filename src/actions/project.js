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
        msg
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
                })
                .catch(function(err){
                    console.log(err)
                })
                
    }
}


