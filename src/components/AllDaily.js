import React, { Component } from 'react'
import Calendar from 'antd/lib/calendar'
import { PieChart, Pie, Legend } from 'recharts'

class AllDaily extends Component{
    render(){
        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]
        return (
            <section className='all-daily'>
                <section className='daily-stats'>
                    <h3 className='daily-header'>当前日期</h3>
                    <PieChart width={270} height={200}>
                        <Pie isAnimationActive={false} data={data01} outerRadius={80} fill="#8884d8" label/>
                    </PieChart>
                    <section className='daily-calendar'>
                        <Calendar fullscreen={false} />
                    </section>
                    
                </section>
                <section className='all-daily-list'>
                    ddddd
                </section>
            </section>
        )
    }
}

export default AllDaily
