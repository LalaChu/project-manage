import React, { Component } from 'react'
import Table from 'antd/lib/table'
import columns from '../tableStructure/department'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DepartmentModal from './modals/Department'
import * as Status from '../constants/status'

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
    componentWillMount(){
        this.props.fetchDepartment()
    }
    componentWillUpdate(){
        const { needFetch, status} = this.props
        if(needFetch && status !== Status.LOADING){
            this.props.fetchDepartment()

        }
        // if(needFetch){
        //     this.props.fetchDepartment()
        // }
    }
    render(){
        console.log(this.props)
        const {departmentVisible, method, list} = this.props
        
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
                    items={list}></DepartmentModal>
            </div>
        )
    }
}

export default Department
