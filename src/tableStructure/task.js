import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'

const createColumns = function(edit, remove){
    return [{
              title: '名称',
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
              title: '创建人',
              dataIndex: 'creator',
              key: 'creator',
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
            }, {
              title: '操作',
              key: 'operation',
              render: (text, record) => {
                return (
                  <div className='icon-manage'>
                      <a onClick={() => {edit(record)}}>提交审查</a>
                      <a className='spin'>|</a>
                      <a onClick={() => {remove(record)}}>查看审查</a>
                  </div>
                )
              }
            }];
}

export default createColumns
