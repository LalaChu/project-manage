import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import createColumns from '../tableStructure/staff'
import StaffModal from './modals/Staff'
import Notification from 'antd/lib/notification'
import * as Status from '../constants/status'
import Modal from 'antd/lib/modal'

const confirm = Modal.confirm 

class Staff extends Component{
    componentWillMount(){
        this.props.fetchStaff()
    }
    componentDidUpdate(){
        this.handleMsg()
    }
    handleOpenModal = () => {
        this.props.setStaffVisible(true, 'add')
    }
    handleCancel = () => {
        this.props.setStaffVisible(false, '')
    }
    handleOpenEdit = (record) => {
        console.log(record)
        this.props.setStaffVisible(true, 'edit', record)
    }
    handleDelete = (record) => {
        confirm({
            title: '确认删除该员工吗？',
            content: '该操作无法还原，请谨慎操作',
            onCancel: () => {},
            onOk: () => {
                this.props.deleteStaff(record)
            }
        })
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
            message: '员工管理通知',
            description: description,
            icon: icon,
        });
    }
    render(){
        // this.handleMsg()
        var columns = createColumns(this.handleOpenEdit, this.handleDelete)
        // console.log(this.props)
        const { list, staffVisible, departmentList, method, record} = this.props
        return (
            <div className='staff'>
                <Button className='add-department' onClick={this.handleOpenModal}><Icon type="plus" />添加员工</Button>
                <Table 
                    size='middle'
                    bordered
                    dataSource={list}
                    columns={columns}
                    rowKey='_id'
                    scroll={{ y: 550 }}/>
                <StaffModal 
                    visible={staffVisible} 
                    onCancel={this.handleCancel}
                    departmentList={departmentList}
                    onAdd={this.props.addStaff}
                    onEdit={this.props.editStaff}
                    method={method}
                    record={record}></StaffModal>
            </div>
        )
    }
}

export default Staff
