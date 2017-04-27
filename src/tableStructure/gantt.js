import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'
import {getMaxAndMinDate} from '../helper'

const createColumns = function(list){
    let month = []
    if(list === undefined || list.length === 0){
      let latestDay = moment().day(1)
      for(let i = 0 ; i < 4 ; i++){
        let week = {
          title: latestDay.format('YYYY MM DD'),
          key: 'week' + i,
          children: []
        }
        for(let j = 0 ; j < 7 ; j++){
          if(j !== 0){
            latestDay.add(1, 'day')
          }
          week.children.push({
            title: latestDay.format('ddd'),
            key: `${i}${j}`
          })
        }
        latestDay.subtract(13, 'day')
        month.push(week)
      }
    }else{
      let date = getMaxAndMinDate(list)
      let endMonday = date.max.day('1')
      let startModay = date.min.day('1')
      for( let i = 0 ; endMonday.isAfter(startModay) ; i++ ){
        let week = {
          title: endMonday.format('YYYY MM DD'),
          key: `week${i}`,
          children: []
        }
        for(let j = 0 ; j < 7 ; j++){
          if(j !== 0){
            endMonday.add(1, 'day')
          }
          week.children.push({
            title: endMonday.format('ddd'),
            key: `${i}${j}`
          })
        }
        endMonday.subtract(13, 'day')
        
        month.push(week)
      }
    }
    let other = [{
              title: '任务名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '状态',
              dataIndex: 'state',
              key: 'state',
            }, {
              title: '负责人',
              dataIndex: 'manageId',
              key: 'manageId',
              render: (text) => {
                return text[0].name
              }
            }, {
              title: '开始时间',
              dataIndex: 'startTime',
              key: 'startTime',
              render: (text) => {
                return text.substr(0, 10)
              } 
            }, {
              title: '结束时间',
              dataIndex: 'endTime',
              key: 'endTime',
              render: (text) => {
                return text ? text.substr(0, 10) : '暂未设置'
              } 
            }]
    other = other.concat(month)
    return other
}

export default createColumns
