import * as Status from '../constants/status'
import * as DepartmentAction from '../constants/Department' 
import 'whatwg-fetch'
import { secretKey } from '../constants/key'
import { setDepartmentVisible } from './components'

const addDepartment = (status) => {
    return {
        type: DepartmentAction.ADD_DEPARTMENT,
        status,
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
        dispatch(addDepartment(Status.LOADING))
        return fetch('/addDepartment',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(addDepartment(Status.SUCCESS))
                    dispatch(setDepartmentVisible(false, ''))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}
