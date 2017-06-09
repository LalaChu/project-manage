import React, { Component } from 'react'
import Timeline from 'antd/lib/timeline'
import StatsInfo from './StatsInfo'
import Task from './task'

const TimeItem = Timeline.Item

class View extends Component{
    componentWillMount(){
        // console.log('dddd')
        this.props.fetchMessage()
        this.props.fetchStats()
    }
    render(){
        const {messageList, checkCount, checkDone, taskCount, taskDone, myTask, isTodayPosted} = this.props
        let messageContent = messageList.map(function(item){
            let message = item.lastManage === '系统更新' ? `${item.lastManage}了任务-${item.name} 的状态` : `${item.creator.name}${item.lastManage}任务-${item.name}`
            return <TimeItem key={item._id}>{message}</TimeItem>
        })
        let tasklist = []
        myTask.map(function(task){
            if(task.state !== 'DONE'){
                tasklist.push(<Task key={task._id} title={task.name} state={task.state}/>)
            }
        })
        console.log(taskCount && taskDone, checkCount, taskDone, checkDone)
        return (
            <div className='view'>
                <section className='view-info'>
                    <div>
                        <StatsInfo title='我的任务' icon='file-text' count={taskCount} num={taskDone }/>
                        <StatsInfo title='我的审查' icon='bars' count={checkCount} num={checkDone}/>
                        <StatsInfo title='今日日报' icon='book' count='1' num={isTodayPosted}/>
                    </div>
                    <div className='view-task-list'>
                        <h3 className='view-task-list-title'>待做任务</h3>
                        {tasklist}
                    </div>
                </section>
                <fieldset className='view-message'>
                    <legend className='view-message-title'>消息中心</legend>
                    {/*<h3 className='view-message-title'>消息中心</h3>*/}
                    <Timeline>
                        {messageContent}
                    </Timeline>
                </fieldset>
                
            </div>

        )
    }
}

export default View
