import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'

const createColumns = function(edit, remove){
    return [{
              title: '员工姓名',
              dataIndex: 'staffId',
              key: 'staffId',
              render: (text, record) => {
                if(text[0] === undefined){
                  return ''
                }
                return text[0].name
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
                if(text[0] === undefined){
                  return ''
                }
                return text[0].name
              }
            }, {
              title: '详细内容',
              dataIndex: 'content',
              key: 'content',
            }, {
              title: '文件',
              dataIndex: 'documentId',
              key: 'document',
            }]
}

export default createColumns
