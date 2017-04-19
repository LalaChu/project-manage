import React, { Component } from 'react'
import Table from 'antd/lib/table'
import createColumns from '../tableStructure/daily'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import DailyModal from './modals/Daily'
import Calendar from 'antd/lib/calendar'
import moment from 'moment'
import Alert from 'antd/lib/alert'
import Notification from 'antd/lib/notification' 
import * as Status from '../constants/status'

import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class MyDaily extends Component{
    constructor(){
        super()
    }
    componentWillMount = () => {
        this.props.fetchMyDaily()
    }
    handleClick = () => {
        this.props.setDailyVisible(true, 'add')
    }
    componentDidUpdate(){
        // console.log(this.props)
        if(this.props.status && this.props.msg){
            console.log(this.props)
            this.showNotification(this.props.status)
        }
        if(this.props.needFetch){
            this.props.fetchMyDaily()
        }
        
    }
    showNotification(status){
        let description = ''
        let icon = ''
        if(status === Status.SUCCESS){
            description = '恭喜您，操作成功'
            icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        }else if(status === Status.ERROR){
            description = '对不起，操作失败，请重试'
            icon = <Icon type="frown-o" style={{ color: '#108ee9' }}/>
        }else{
            return
        }
        Notification.open({
            message: '日报通知',
            description: description,
            icon: icon,
        });
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
            let edit 
            if(date.isSame(moment(new Date()), 'day')){
                edit = <div className='date-box-manage'>
                        <span onClick={(e) => {setDailyVisible(true, 'edit', value)}}>
                            <Icon type='edit' />
                        </span></div>
            }else{
                edit = ''
            }
            return (
            <div className='date-box'>
                <span className='list-dot'>●</span><span>{value.title}</span>
                {edit}
            </div>)
        }
        
    }
    handleViewDaily = (date) => {
        let value = {}
        this.props.myDailyList.map(function(daily){
            if(date.isSame(moment(daily.date),'day')){
                value = daily
            }
        })
         if(!value.hasOwnProperty('_id')){
            return ''
        }else{
            this.props.setDailyVisible(true, 'view', value)
        }
    }
    render(){
        const columns = createColumns()
        const { visible, taskList, method, record  } = this.props
        console.log(this.props)
        let isTodayPosted = false
        if(this.props.myDailyList.length){
            this.props.myDailyList.map(function(daily){
                if(moment(daily.date).isSame(moment(new Date()), 'day')){
                    isTodayPosted = true
                }
            })
        }
        console.log(isTodayPosted)
        return (
            <div className='my-daily'>
                <Button 
                    disabled={isTodayPosted}
                    onClick={this.handleClick}
                    className='add-item'>
                    <Icon type="plus" />{isTodayPosted ? '今天已提交过日报' : '添加日报'}
                </Button>
                <Calendar
                    onSelect={this.handleViewDaily}
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
