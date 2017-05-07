import * as StatsAction from '../constants/stats'
import * as Status from '../constants/status'

const getMessage = (status,list) => {
    return {
        type: StatsAction.GET_MESSAGE,
        status,
        list
    }
}
export const fetchMessage = () => {
    var init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(getMessage(Status.LOADING, []))
        return fetch('/message',init)
                .then((response) => {
                    response.json().then(function(json){
                        // if(json.result == 'success'){
                            dispatch(getMessage(Status.SUCCESS,json.result))
                            // dispatch(fetchLogin(info.telephone, info.password))
                            // browserHistory.push('/')
                        // }else{
                        //     dispatch(getMessage(Status.ERROR,json.result.errmsg))
                            
                        // }
                        // dispatch(getMessage('',''))
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
    }
}
