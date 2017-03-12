import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import columns from '../tableStructure/project'
import { addKeyColumns } from '../helper'
import Icon from 'antd/lib/icon'
import ItemTypeSelect from './modals/ItemTypeSelect'
import AddProject from './modals/AddProject'
import AddCategory from './modals/AddCategory'
import AddTask from './modals/AddTask'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
    }
    handleOpenClick = () => {
        console.log('test')
        this.props.setTypeSelectVisible(true)
    }
    render(){
        console.log(this.props)
        const dataSource = addKeyColumns(this.props.list)
        const { typeSelectVisible } = this.props
        return (
            <div className='project-list'>
                <Button 
                    onClick={() => {this.handleOpenClick()}}
                    className='add-item'><Icon type="plus" /></Button>
                <Table 
                    size='middle'
                    dataSource={dataSource}
                    columns={columns} 
                    bordered/>
                <ItemTypeSelect 
                    onCancel={this.props.setTypeSelectVisible}
                    visible={typeSelectVisible}></ItemTypeSelect>
                <AddProject></AddProject>
                <AddCategory></AddCategory>
                <AddTask></AddTask>
            </div>
        )
    }
}

export default Project
