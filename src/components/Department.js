import React, { Component } from 'react'
import Table from 'antd/lib/table'
import columns from '../tableStructure/department'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DepartmentModal from './modals/Department'

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
    render(){
        console.log(this.props.UIState)
        const {departmentVisible, method} = this.props.UIState
        return (
            <div className='department'>
                <Button className='add-department' onClick={this.handleOpenAdd}><Icon type="plus" />添加部门</Button>
                <Table 
                    size='middle'
                    columns={columns} 
                    bordered/>
                <DepartmentModal 
                    visible={departmentVisible} 
                    method={method} 
                    onCancel={this.handleCancel}
                    onAdd={this.handleAdd}></DepartmentModal>
            </div>
        )
    }
}

export default Department
