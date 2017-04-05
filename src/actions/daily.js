import * as DailyAction from '../constants/daily'
import * as Status from '../constants/status'
import * as UIAction from './components'

const addDaily = (status,msg) => {
    return {
        type: DailyAction.ADD_DAILY,
        status,
        msg
    }
}

export const fetchAddDaily = (info) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(addDaily(Status.LOADING, ''))
        return fetch('/daily',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(addDaily(Status.SUCCESS, 'success'))
                    dispatch(addDaily('',''))
                    dispatch(UIAction.setDailyVisible(false, ''))
                    
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}

const getMyDaily = (status, list) => {
    return {
        type: DailyAction.GET_MY_DAILY,
        status,
        myDailyList: list
    }
}

export const fetchMyDaily = () => {
    var init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(getMyDaily(Status.LOADING, []))
        return fetch('/myDailyList',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(getMyDaily(Status.SUCCESS, json.result))
                    // dispatch(addDaily('',''))
                    // dispatch(UIAction.setDailyVisible(false, ''))
                    
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}
