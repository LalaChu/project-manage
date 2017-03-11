import React, { Component } from 'react'
import Table from 'antd/lib/table'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
    }
    render(){
        console.log('project:',this.props)
        return (
            <div>
                <Table></Table>
            </div>
        )
    }
}

export default Project
