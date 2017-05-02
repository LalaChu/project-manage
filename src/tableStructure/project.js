import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'
import Tooltip from 'antd/lib/tooltip'
import {getStateWord} from '../helper'

const createColumns = function(edit, remove){
    return [{
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
              render: (text) => {
                if(text === 'project'){
                  return '项目'
                }else if(text === 'category'){
                  return '工作分类'
                }else{
                  return '具体工作'
                } 
              }
            }, {
              title: '状态',
              dataIndex: 'state',
              key: 'state',
              render: (text) => {
                return  <Tooltip title={getStateWord(text)}>
                          <div className={`project-state-block ${text.toLowerCase()}`}></div>
                        </Tooltip>
              }
            }, {
              title: '负责人',
              dataIndex: 'manageId',
              key: 'manageId',
              render: (text) => {
                return text.name
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
                      <a onClick={() => {edit(record)}}><Icon type="edit" /></a>
                      <a className='spin'>|</a>
                      <a onClick={() => {remove(record)}}><Icon type="delete" /></a>
                  </div>
                )
              }
            }];
}

export default createColumns
