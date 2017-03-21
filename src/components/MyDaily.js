import React, { Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/daily'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DailyModal from './modals/Daily'

class MyDaily extends Component{
    handleClick = () => {
        console.log('tetett')
        this.props.setDailyVisible(true, 'add')
    }
    handleCancel = () => {
        this.props.setDailyVisible(false)
    }
    render(){
        console.log(this.props)
        const columns = createColumns()
        const { visible } = this.props
        return (
            <div className='my-daily'>
                <Button 
                    onClick={this.handleClick}
                    className='add-item'>
                    <Icon type="plus" />添加日报
                </Button>
                <Table
                    bordered
                    size='middle'
                    columns={columns} />
                <DailyModal 
                    visible={visible}
                    onCancel={this.handleCancel}/>
            </div>
        )
    }
}

export default MyDaily
