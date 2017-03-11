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
    return function(dispatch){
        dispatch(getProjectList(Status.LOADING))
        let url = `http://cloud.bmob.cn/${secretKey}/getProjectList`
        return fetch(url)
                .then((response) => { return response.json()})
                .then(json =>{ dispatch(getProjectList(Status.SUCCESS, filterData(json)))})
                .catch(function(err){
                    console.log(err)
                })
                
    }
}

function filterData(list){
    if(list){
        return list.results
    }
    return []
}
