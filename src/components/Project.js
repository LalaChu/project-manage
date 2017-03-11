import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import columns from '../tableStructure/project'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
    }
    render(){
        console.log('project:',this.props)
        return (
            <div className='project-list'>
                <Button></Button>
                <Table 
                    columns={columns} 
                    bordered/>
            </div>
        )
    }
}

export default Project
