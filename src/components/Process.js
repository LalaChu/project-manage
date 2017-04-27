import React, { Component } from 'react'
import moment from 'moment'
import Gantt from './Gantt'

class Process extends Component{
    componentWillMount(){
        this.props.fetchTask()
    }
    render(){
        const {taskList} = this.props
        return (
            <div className='process'>
                <Gantt 
                list={taskList}/>
            </div>
        )
    }
}

export default Process
