import * as Status from '../constants/status'
import * as projectAction from '../constants/project' 
import 'whatwg-fetch'
import { secretKey } from '../constants/key'

const getProjectList = (status, list) => {
    return {
        type: projectAction.GET_PROJECT_LIST,
        status,
        list: list || []
    }
}

export const fetchProjectList = () => {
    console.log(secretKey)
    return function(dispatch){
        dispatch(getProjectList(Status.LOADING))
        let url = `http://cloud.bmob.cn/${secretKey}/test`
        return fetch(url)
                .then((response) => { console.log(response)})
                .catch(function(err){
                    console.log(err)
                })
                //.then(json =>{ dispatch(getProjectList(Status.SUCCESS, json))
                //})
    }
}
