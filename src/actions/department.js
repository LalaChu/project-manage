import * as Status from '../constants/status'
import * as DepartmentAction from '../constants/department' 
import 'whatwg-fetch'
import { secretKey } from '../constants/key'
import { setDepartmentVisible } from './components'

const addDepartment = (status,msg) => {
    return {
        type: DepartmentAction.ADD_DEPARTMENT,
        status,
        msg
    }
}

export const fetchAddDepartment = (department) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(department),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(addDepartment(Status.LOADING, ''))
        return fetch('/addDepartment',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(addDepartment(Status.SUCCESS, 'success'))
                    dispatch(addDepartment('',''))
                    dispatch(setDepartmentVisible(false, ''))
                    
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}

const departments = (status, list) => {
    return {
        type: DepartmentAction.GET_DEPARTMENT,
        status,
        list
    }
}


export const fetchDepartments = () => {
    var init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(departments(Status.LOADING))
        return fetch('/departmentList',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(departments(Status.SUCCESS, json.result))
                    // dispatch(setDepartmentVisible(false, ''))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}
