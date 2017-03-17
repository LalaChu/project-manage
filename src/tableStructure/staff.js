import React from 'react'

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  width: 150
}, {
  title: '电话',
  dataIndex: 'telephone',
  key: 'telephone',
  width: 150
}, {
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
  width: 150
},{
  title: '部门',
  dataIndex: 'departmentName',
  key: 'departmentName',
  width: 150,
  render: (e) => {
    console.log(e)
    return (
      <div>{e[0]}{e[1] ? ' > ' : ''}{e[1]}</div>
    )
  }
}, {
  title: '权限',
  dataIndex: 'authority',
  key: 'authority',
  width: 150
}, {
  title: '操作',
  key: 'opration',
  render: () => {
    return 'ddd'
  },
  width: 150
}];

export default columns
