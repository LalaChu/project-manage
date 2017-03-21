import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import createColumns from '../tableStructure/project'
import { addKeyColumns } from '../helper'
import Icon from 'antd/lib/icon'
import ItemTypeSelect from './modals/ItemTypeSelect'
import ProjectModal from './modals/Project'
import Category from './modals/Category'
import Task from './modals/Task'
import Notification from 'antd/lib/notification'
import * as Status from '../constants/status'
import Modal from 'antd/lib/modal'

const confirm = Modal.confirm

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
    handleAddTask = (info) => {
        this.props.addTask(info)
    }
    componentDidUpdate(){
        this.handleMsg()
    }
    handleEditProject = (info) => {
        this.props.editProject(info)
    }
    handleEditTask = (info) => {
        this.props.editTask(info)
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
    componentWillUpdate(){
        const { needFetch, status } = this.props
        if(needFetch && status !== Status.LOADING){
            this.props.getProjectList()
        }
    }
    handleEditOpen = (record) => {
        if(record.type === 'project'){
            this.props.setAddProjectVisible(true, 'edit', record)
        }else if(record.type === 'category'){
            this.props.setAddCategoryVisible(true, 'edit', record)
        }else{
            this.props.setAddTaskVisible(true, 'edit', record)
        }
    }
    handleRemove = (record) => {
        let title = ''
        if(record.type === 'project'){
            title = '项目'
        }else if(record.type === 'category'){
            title = '工作分类'
        }else{
            title = '具体工作'
        }
        confirm({
            title: `确认删除该${title}吗？`,
            content: '该操作无法还原，请谨慎操作',
            onCancel: () => {},
            onOk: () => {
                if(record.type === 'task'){
                    this.props.removeTask(record)
                }else{
                    this.props.removeProject(record)
                }
            }
        })
    }
    render(){
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
        const columns = createColumns(this.handleEditOpen, this.handleRemove)
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
                    onEdit={this.handleEditProject}
                    method={method}
                    record={record}/>
                <Category
                    onCancel={setAddCategoryVisible}
                    visible={addCategoryVisible}
                    staffList={staffList}
                    onAdd={this.handleAddProject} 
                    method={method}
                    projectList={dataSource}
                    record={record}
                    onEdit={this.handleEditProject}/>
                <Task 
                    onCancel={setAddTaskVisible}
                    visible={addTaskVisible}
                    staffList={staffList}
                    onAdd={this.handleAddTask} 
                    method={method}
                    record={record}
                    projectList={dataSource}
                    onEdit={this.handleEditTask}/>
            </div>
        )
    }
}

export default Project
