import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import columns from '../tableStructure/project'
import { addKeyColumns } from '../helper'
import Icon from 'antd/lib/icon'
import ItemTypeSelect from './modals/ItemTypeSelect'
import ProjectModal from './modals/Project'
import Category from './modals/Category'
import Task from './modals/Task'
import Notification from 'antd/lib/notification'

class Project extends Component{
    componentWillMount(){
        this.props.getProjectList()
        this.props.getStaff()
    }
    handleOpenClick = () => {
        this.props.setTypeSelectVisible(true)
    }
    handleAddProject = (info) => {
        this.props.addProject(info)
    }
    componentDidUpdate(){
        this.handleMsg()
    }
    handleMsg(){
        const {msg} = this.props
        let description = '', icon 
        if(msg === 'success'){
            description = '恭喜您，操作成功'
            icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        }else if(msg !== ''){
            description = '对不起，操作失败，请重试'
            icon = <Icon type="frown-o" style={{ color: '#108ee9' }}/>
        }else{
            return
        }
        Notification.open({
            message: '项目管理通知',
            description: description,
            icon: icon,
        });
    }
    render(){
        console.log(this.props)
        const dataSource = addKeyColumns(this.props.list)
        const { 
                typeSelectVisible,
                addProjectVisible,
                addCategoryVisible,
                addTaskVisible,
                method,
                record
            } = this.props
        const { 
                setAddProjectVisible,
                setAddCategoryVisible,
                setAddTaskVisible,
                staffList
            } = this.props
        return (
            <div className='project-list'>
                <Button 
                    onClick={() => {this.handleOpenClick()}}
                    className='add-item'><Icon type="plus" /></Button>
                <Table 
                    size='middle'
                    dataSource={dataSource}
                    columns={columns} 
                    bordered
                    rowKey='_id'/>
                <ItemTypeSelect 
                    onCancel={this.props.setTypeSelectVisible}
                    setAddCategoryVisible={setAddCategoryVisible}
                    setAddProjectVisible={setAddProjectVisible}
                    setAddTaskVisible={setAddTaskVisible}
                    visible={typeSelectVisible} />
                <ProjectModal
                    onCancel={setAddProjectVisible}
                    visible={addProjectVisible}
                    onAdd={this.handleAddProject} 
                    staffList={staffList}
                    method={method}/>
                <Category
                    onCancel={setAddCategoryVisible}
                    visible={addCategoryVisible}/>
                <Task 
                    onCancel={setAddTaskVisible}
                    visible={addTaskVisible}/>
            </div>
        )
    }
}

export default Project
