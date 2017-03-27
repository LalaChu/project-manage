import * as DocumentAction from '../constants/document'
import * as Status from '../constants/status'
import * as UIAction from './components'

const getFiles = (status, list) => {
    return {
        type: DocumentAction.GET_CUR_FILE,
        status,
        list
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
                    // console.log(json)
                    dispatch(getFiles(Status.SUCCESS, json.result))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}

const addFolder = (status, msg) => {
    return {
        type: DocumentAction.ADD_DIR,
        status,
        msg
    }
}

export const fetchAddFolder = (folder) => {
    var init = {
        method: 'POST',
        body: JSON.stringify(folder),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(addFolder(Status.LOADING, ''))
        return fetch('/folder',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    // console.log(json)
                    dispatch(addFolder(Status.SUCCESS, 'success'))
                    dispatch(UIAction.setFolderVisible(false))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}
