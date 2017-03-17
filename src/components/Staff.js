import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import columns from '../tableStructure/staff'
import StaffModal from './modals/Staff'
import Notification from 'antd/lib/notification'
import * as Status from '../constants/status'

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
    handleMsg(){
        const {msg} = this.props
        let description = '', icon 
        if(msg === 'success'){
            console.log('---------------------------this is method')
            console.log('---------------------------success')
            description = '恭喜您，添加成功'
            icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        }else if(msg !== ''){
            description = '对不起，添加失败，请重试'
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
        console.log(this.props)
        const { list, staffVisible, departmentList } = this.props
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
                    onAdd={this.props.addStaff}></StaffModal>
            </div>
        )
    }
}

export default Staff
