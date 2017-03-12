import React, { Component } from 'react'
import Menu from 'antd/lib/menu'
import { Link } from 'react-router'
import { Sider } from 'antd/lib/layout'


const SubMenu = Menu.SubMenu

class Sidebar extends Component{
    render(){
        console.log(this.props)
        let openKeys = this.props.openNow === '' ? [] :[this.props.openNow] 
        return (
            <Sider>
                <div className='user-info'>ddd</div>
                <Menu
                    defaultSelectedKeys={[this.props.currentMenu]}
                    defaultOpenKeys={openKeys}
                    mode='inline'
                    onClick={(e) => {this.props.onClick(e)}}
                    >
                    <Menu.Item key='view'>
                        <Link to='/view'>首页</Link>
                    </Menu.Item>
                    <Menu.Item key='process'>
                        <Link to='/process'>进度</Link>
                    </Menu.Item>
                    <Menu.Item key='project'>
                        <Link to='/project'>项目</Link>
                    </Menu.Item>
                    <Menu.Item key='document'>
                        <Link to='/document'>文档管理</Link>
                    </Menu.Item>
                    <SubMenu key='approval' title='审批'>
                        <Menu.Item key='need'>
                            <Link to='/approval/need'>待我审批</Link>
                        </Menu.Item>
                        <Menu.Item key='start'>
                            <Link to='/approval/start'>我发起的</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='daily' title='日报'>
                        <Menu.Item key='all'>
                            <Link to='/daily/all'>所有日报</Link>
                        </Menu.Item>
                        <Menu.Item key='my'>
                            <Link to='/daily/my'>日报</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='organization' title='部门及人员'>
                        <Menu.Item key='department'>
                            <Link to='/organization/department'>部门设置</Link>
                        </Menu.Item>
                        <Menu.Item key='stuff'>
                            <Link to='/organization/stuff'>员工管理</Link>
                        </Menu.Item>
                        <Menu.Item key='authority'>
                            <Link to='/organization/authority'>权限设置</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='self'>
                        <Link to='/personal'>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key='logout'>
                        <span>退出系统</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
