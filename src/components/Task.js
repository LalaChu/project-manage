import React, { Component } from 'react'

class Task extends Component{
    render(){
        const {title, state} = this.props
        return (
            <div className='view-task-item'>

                {title} -- {state}
            </div>
        )
    }
}

export default Task
