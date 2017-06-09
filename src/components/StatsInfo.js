import React, { Component } from 'react'
import Timeline from 'antd/lib/timeline'
import Progress from 'antd/lib/progress'
import Icon from 'antd/lib/icon'

const TimeItem = Timeline.Item

class StatsInfo extends Component{
    render(){
        const {title, count, num, icon} = this.props
        return (
            <div className='stats-info'>
                <div className='stats-icon'>
                    <Icon type={icon}/>
                </div>
                <div className='stats-description'>
                    <span className='stats-title'>{title}</span>
                    <span className='stats-number'>{num}/{count}</span>
                </div>
                
                <Progress className='stats-progress' percent={ count ? num/count*100 : 0} strokeWidth={15}/>
            </div>
        )
    }
}

export default StatsInfo
