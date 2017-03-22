import * as DocumentAction from '../constants/document'
import * as Status from '../constants/status'

const getFiles = (status, list) => {
    return {
        type: DocumentAction.GET_CUR_FILE,
        status,
        list: list
    }
}

export const fetchFiles = (location) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(location),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(getFiles(Status.LOADING, []))
        return fetch('/fileList',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(getFiles(Status.SUCCESS, json.result))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}
