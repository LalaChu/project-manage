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

const getFolderTree = (status, list) => {
    return {
        type: DocumentAction.GET_FOLDER_TREE,
        status,
        list
    }
}

export const fetchFolderTree = () => {
    var init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(getFolderTree(Status.LOADING, []))
        return fetch('/folderTree',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    // console.log(json)
                    dispatch(getFolderTree(Status.SUCCESS, json.result))
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
                    dispatch(addFolder('', ''))
                    dispatch(UIAction.setFolderVisible(false))
                }).catch(function(err){
                    console.log(err)
                })
                
    }
}


const editFolder = (status, msg) => {
    return {
        type: DocumentAction.EDIT_DIR,
        status,
        msg
    }
}

export const fetchEditFolder = (folder) => {
    var init = {
        method: 'PUT',
        body: JSON.stringify(folder),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(editFolder(Status.LOADING, ''))
        return fetch('/folder',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(editFolder(Status.SUCCESS, 'success'))
                    dispatch(editFolder('', ''))
                    dispatch(UIAction.setFolderVisible(false))
                    
                }).catch(function(err){
                    console.log(err)
                })
    }
}

export const setCurrentLocation = (location) => {
    return {
        type: DocumentAction.SET_CUR_LOCATION,
        location
    }
}

const deleteFolder = (status, msg) => {
    return {
        type: DocumentAction.REMOVE_DIR,
        status,
        msg     
    }
}

export const fetchDeleteFolder = (folder) => {
    var init = {
        method: 'DELETE',
        body: JSON.stringify(folder),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(deleteFolder(Status.LOADING, ''))
        return fetch('/folder',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(deleteFolder(Status.SUCCESS, 'success'))
                    dispatch(deleteFolder('',''))
                }).catch(function(err){
                    console.log(err)
                })
    }
}

const editFile = (status, msg) => {
    return {
        type: DocumentAction.EDIT_FILE,
        status,
        msg
    }
}
export const fetchEditFile = (file) => {
    var init = {
        method: 'PUT',
        body: JSON.stringify(file),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(editFile(Status.LOADING, ''))
        return fetch('/file',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(editFile(Status.SUCCESS, 'success'))
                    dispatch(editFile('',''))
                    dispatch(UIAction.setFileVisible(false))
                }).catch(function(err){
                    console.log(err)
                })
    }
}

const deleteFile = (status, msg) => {
    return {
        type: DocumentAction.REMOVE_FILE,
        status,
        msg     
    }
}

export const fetchDeleteFile = (file) => {
    var init = {
        method: 'DELETE',
        body: JSON.stringify(file),
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    return function(dispatch){
        dispatch(deleteFile(Status.LOADING, ''))
        return fetch('/file',init)
                .then((response) => { return response.json()})
                .then(json =>{ 
                    dispatch(deleteFile(Status.SUCCESS, 'success'))
                    dispatch(deleteFile('',''))
                }).catch(function(err){
                    console.log(err)
                })
    }
}
