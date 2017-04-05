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
    componentWillMount = () => {
        this.props.fetchMyDaily()
    }
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
    handleRenderDate = (date) => {
        let value = []
        this.props.myDailyList.map(function(daily){
            if(date.isSame(moment(daily.date),'day')){
                value.push(daily)
            }
            // console.log(date.isSame(moment(daily.date),'day')
        })
        let content = value.map(function(item){
            return <li key={item._id}>
                <span className='list-dot'>●</span>
                {item.title}
            </li>
        })
        return <ul>{content}</ul>
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
                <Calendar 
                    dateCellRender={this.handleRenderDate}/>
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
