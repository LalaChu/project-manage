import React, { Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/daily'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DailyModal from './modals/Daily'
import Calendar from 'antd/lib/calendar'
import moment from 'moment'
import Alert from 'antd/lib/alert'


import 'moment/locale/zh-cn'
moment.locale('zh-cn')


class MyDaily extends Component{
    handleClick = () => {
        console.log('tetett')
        this.props.setDailyVisible(true, 'add')
    }
    handleCancel = () => {
        this.props.setDailyVisible(false)
    }
    handleAddDaily = (info) => {
        this.props.addDaily(info)
    }
    render(){
        console.log(this.props)
        const columns = createColumns()
        const { visible, taskList, method } = this.props
        return (
            <div className='my-daily'>
                <Button 
                    onClick={this.handleClick}
                    className='add-item'>
                    <Icon type="plus" />添加日报
                </Button>
                <Calendar></Calendar>
                <DailyModal
                    method={method}
                    onAdd={this.handleAddDaily}
                    taskList={taskList}
                    visible={visible}
                    onCancel={this.handleCancel}/>
            </div>
        )
    }
}

export default MyDaily
