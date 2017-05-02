import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'
import {getMaxAndMinDate} from '../helper'

const createColumns = function(list){
    let date = list && list.length > 0 ? getMaxAndMinDate(list) : '' 
    let month = []
    let i , j
    let weeks = []
    let days = []
    if(list === undefined || list.length === 0){
      let latestDay = moment().day(1)
      for(i = 0 ; i < 4 ; i++){
        let week = <td key={latestDay.format('x') + 'week'} colSpan={7} className='process-week'>{latestDay.format('YYYY MM DD')}</td>
        weeks.push(week)
        for( j = 0 ; j < 7 ; j++){
          if(j !== 0){
            latestDay.add(1, 'day')
          }
          let day = <td key={latestDay.format('x') + 'day'} className='process-day'>{latestDay.format('ddd')}</td>
          days.push(day)
        }
        
        latestDay.subtract(13, 'day')
        // month.push(week)
      }
    }else{
      // let date = getMaxAndMinDate(list)
      let endMonday = date.max.day('1')
      let startModay = date.min.day('1')
      let endTime = new Date(endMonday)
      let startTime = new Date(startModay)
      let subdays =parseInt((endTime.getTime() - startTime.getTime())/(24*3600*1000))
      if(subdays < 30){
        startModay.subtract(31-subdays, 'day')
        startModay = moment(startModay).day(1)
      }
      for( i = 0 ; endMonday.isAfter(startModay) ; i++ ){
        let week = <td key={endMonday.format('x') + 'week'} colSpan={7} className='process-week'>{endMonday.format('YYYY MM DD')}</td>
        weeks.push(week)
        for( j = 0 ; j < 7 ; j++){
          if(j !== 0){
            endMonday.add(1, 'day')
          }
          let day = <td key={endMonday.format('x') + 'day'} className='process-day'>{endMonday.format('ddd')}</td>
          days.push(day)
        }
        endMonday.subtract(13, 'day')
      }
    }
    let dataDiv = <div className='gantt-time-table'>
       <table>
         <tbody>
           <tr>{weeks.reverse()}</tr>
           <tr>{days}</tr>
         </tbody>
       </table>
    </div>
    month = month.reverse()
    let other = [{
              title: '任务名称',
              dataIndex: 'name',
              key: 'name',
              fixed: 'left',
              width: 100
            }, {
              title: '状态',
              dataIndex: 'state',
              key: 'state',
              fixed: 'left',
              width: 100
            }, {
              title: '负责人',
              dataIndex: 'manageId',
              key: 'manageId',
              fixed: 'left',
              width: 100,
              render: (text) => {
                return text.name
              }
            },{
              title: dataDiv,
              className: 'gantt-time',
              dataIndex: 'startTime',
              key: 'startTime',
              render: (text, record) => {
                let leftMargin = 0
                let width = 0
                if(date != ''){
                  let minDate = new Date(date.min.format())
                  let startDate = new Date(record.startTime)
                  let endDate = new Date(record.endTime)
                  leftMargin = parseInt((startDate.getTime() - minDate.getTime())/(24*3600*1000)) * 36 - 41
                  width =  parseInt((endDate.getTime() - startDate.getTime())/(24*3600*1000)) * 36
                }
                return <div className='process-bar' style={{marginLeft: leftMargin + 'px', width: width + 'px'}}></div>
              },
            }]
    return {
      columns: other,
      width: (i)* (j)* 36 + 300
    }
}

export default createColumns
