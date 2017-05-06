import React from 'react'
import Icon from 'antd/lib/icon'
import moment from 'moment'
import Tooltip from 'antd/lib/tooltip'
import {getStateWord} from '../helper'

const createColumns = function(check, remove){
    return [{
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '状态',
              dataIndex: 'state',
              key: 'state',
              render: (text, record) => {
                let state = record.checkState !== undefined && record.checkState !== '' ? record.checkState : text
                return  <Tooltip title={getStateWord(state)}>
                          <div className={`project-state-block project-state-block-${state.toLowerCase()}`}></div>
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
              title: '创建人',
              dataIndex: 'creator',
              key: 'creator',
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
              title: '审查',
              key: 'operation',
              render: (text, record) => {
                let disableCheck = record.checkState === 'TOBEREVIEWED' ? false : true
                let passrecord = {
                  ...record,
                  checkState: 'DONE'
                }
                let notpassrecord = {
                  ...record,
                  checkState: 'NOTPASSED'
                }
                return (
                  <div className='icon-manage'>
                      <a onClick={() => {check(passrecord)}} disabled={disableCheck}>通过</a>
                      <a className='spin'>|</a>
                      <a onClick={() => {check(notpassrecord)}} disabled={disableCheck}>不通过</a>
                  </div>
                )
              }
            }];
}

export default createColumns
