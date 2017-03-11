import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import columns from '../tableStructure/project'
import { addKeyColumns } from '../helper'
import Icon from 'antd/lib/icon'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
    }
    render(){
        const dataSource = addKeyColumns(this.props.list)
        console.log(dataSource)
        return (
            <div className='project-list'>
                <Button className='add-item'><Icon type="plus" /></Button>
                <Table 
                    size='middle'
                    dataSource={dataSource}
                    columns={columns} 
                    bordered/>
            </div>
        )
    }
}

export default Project
