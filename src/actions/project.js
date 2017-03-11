import * as Status from '../constants/status'
import * as projectAction from '../constants/project' 

export const getProjectList = (status, list) => {
    return {
        type: projectAction.GET_PROJECT_LIST,
        status,
        list: list || []
    }
}

export const fetchProjectList = () => {
    return function(dispatch){
        dispatch(requestPosts(Status.LOADING))
        console.log(fetch);
        let url = `https://www.reddit.com/r/reactjs.json`
        return fetch(url)
                .then((response) => { return response.json()})
                .then(json =>{ dispatch(getProjectList(Status.SUCCESS, json))
                })
    }
}
