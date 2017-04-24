import React, { Component } from 'react'
import Calendar from 'antd/lib/calendar'
import Table from 'antd/lib/table'
import moment from 'moment'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import createColumns from '../tableStructure/allDaily'

class AllDaily extends Component{
    componentWillMount(){
        this.props.getDailyList({date: ''})
    }
    handleSelectDate = (date) => {
        console.log(date.toString())
        this.props.getDailyList({date: date.toString()})
    }
    render(){
        const { dailyList, date, allNum, dailyNum } = this.props 
        let currDate = date === '' ? new Date() : date
        const pieData = [
            {name: '未提交日报人数', value: allNum - dailyNum}, 
            {name: '已提交日报人数', value: dailyNum}]
        const columns = createColumns()
        let pie 
        if(allNum === 0){
            pie = <div className='pie-nodata'>
                        暂无数据
                    </div>
        }else{
            pie = <ResponsiveContainer width='100%' height={250} minWidth={200} maxWidth={250}>
                <PieChart >
                        <Pie 
                            isAnimationActive={false} 
                            data={pieData} 
                            outerRadius={80} 
                            fill="#8884d8" 
                            label={true}
                            labelLine={false}/>
                        <Tooltip></Tooltip>
                  </PieChart>
            </ResponsiveContainer>
                
        }
        return (
            <section className='all-daily'>
                <section className='daily-stats'>
                    <h3 className='daily-header'>当前日期: {moment(currDate).format('YYYY年MM月DD日')}</h3>
                    {pie}
                    <div className='daily-calendar'>
                        <Calendar
                            onSelect={this.handleSelectDate} 
                            fullscreen={false} 
                            />
                    </div>  
                </section>
                <section className='all-daily-list'>
                    <Table 
                    size='middle'
                    dataSource={dailyList}
                    columns={columns} 
                    bordered
                    rowKey='_id'/>
                </section>
            </section>
        )
    }
}

export default AllDaily
