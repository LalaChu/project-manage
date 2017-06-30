import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'

const createColumns = function(edit, remove){
    return [{
              title: '员工姓名',
              dataIndex: 'staffId',
              key: 'staffId',
              render: (text, record) => {
                if(text === undefined){
                  return ''
                }
                return text.name
              }
            },{
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            }, {
              title: '相关任务',
              dataIndex: 'taskId',
              key: 'taskId',
              render: (text, record) => {
                if(text === undefined || text.length === 0){
                  return '暂无'
                }
                return text.name
              }
            }, {
              title: '详细内容',
              dataIndex: 'content',
              key: 'content',
            }, {
              title: '文件',
              dataIndex: 'documentId',
              key: 'document',
              render: (text, record) => {
                console.log(text)
                if(text === undefined || text === ''){
                  return '暂无'
                }
                return text.name
              }
            }]
}

export default createColumns
