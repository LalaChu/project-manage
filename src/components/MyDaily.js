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
        const { setDailyVisible } = this.props
        let value = {}
        this.props.myDailyList.map(function(daily){
            if(date.isSame(moment(daily.date),'day')){
                value = daily
            }
        })
        if(!value.hasOwnProperty('_id')){
            return ''
        }else{
            return (
            <div className='date-box'>
                <span className='list-dot'>●</span><span>{value.title}</span>
                <div className='date-box-manage'>
                    <span onClick={(e) => {setDailyVisible(true, 'view', value)}}><Icon type='eye-o' /></span>
                    <span onClick={(e) => {setDailyVisible(true, 'edit', value)}}><Icon type='edit' /></span>
                </div>
                
            </div>)
        }
        
    }
    render(){
        console.log(this.props)
        const columns = createColumns()
        const { visible, taskList, method, record  } = this.props
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
                    record={record}
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
