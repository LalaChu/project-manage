import React, { Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/department'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DepartmentModal from './modals/Department'
import * as Status from '../constants/status'
import Notification from 'antd/lib/notification'

class Department extends Component{
    handleOpenAdd = () => {
        this.props.setDepartmentVisible(true, 'add')
    }
    handleCancel = () => {
        this.props.setDepartmentVisible(false, '')
    }
    handleAdd = (department) => {
        this.props.addDepartment(department)
    }
    handleOpenEdit = (department) => {
        this.props.setDepartmentVisible(true, 'edit', department)
    }
    componentWillMount(){
        this.props.fetchDepartment()
    }
    componentWillUpdate(){
        const { needFetch, status} = this.props
        if(needFetch && status !== Status.LOADING){
            this.props.fetchDepartment()
        }
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
            message: '部门管理通知',
            description: description,
            icon: icon,
        });
    }
    render(){
        const {departmentVisible, method, list, staffList, record} = this.props
        const columns = createColumns(this.handleOpenEdit)
        console.log('this is department: ', this.props)
        return (
            <div className='department'>
                <Button className='add-department' onClick={this.handleOpenAdd}><Icon type="plus" />添加部门</Button>
                <Table 
                    size='middle'
                    columns={columns} 
                    bordered
                    dataSource={list}
                    rowKey='_id'
                    scroll={{ y: 550 }}
                    pagination={false}/>
                <DepartmentModal 
                    visible={departmentVisible} 
                    method={method} 
                    onCancel={this.handleCancel}
                    onAdd={this.handleAdd}
                    items={list}
                    staffList={staffList}
                    record={record}></DepartmentModal>
            </div>
        )
    }
}

export default Department
