import React, { Component } from 'react'
import Icon from 'antd/lib/icon'

class Task extends Component{
    render(){
        let {title, state} = this.props
        // let state = ''
        if(state === 'TOBESTARTED'){
            state = '未开始'
        }else if(state === 'DONE'){
            state = '已完成';
        }else if(state = 'DOING'){
            state = '进行中'
        }else{
            state = '已延期'
        }
        return (
            <div className='view-task-item'>

                <Icon type='file-text' className='view-task-item-icon'></Icon>{title} -- {state}
            </div>
        )
    }
}

export default Task
