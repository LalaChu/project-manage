import React, { Component } from 'react'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
    }
    render(){
        return (
            <div>this is project</div>
        )
    }
}

export default Project
