import React, { Component } from 'react'
import Timeline from 'antd/lib/timeline'

const TimeItem = Timeline.Item

class View extends Component{
    render(){
        return (
            <div className='view'>
                <section className='view-info'></section>
                <section className='view-message'>
                    <h3 className='view-message-title'>消息中心</h3>
                    <Timeline>
                        <TimeItem>step1 2015-09-01</TimeItem>
                        <TimeItem>step2 2015-09-01</TimeItem>
                        <TimeItem>step3 2015-09-01</TimeItem>
                        <TimeItem>step4 2015-09-01</TimeItem>
                    </Timeline>
                </section>
            </div>

        )
    }
}

export default View
