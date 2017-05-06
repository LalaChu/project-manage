import React, { Component } from 'react'
import Menu from 'antd/lib/menu'
import { Link } from 'react-router'
import { Sider } from 'antd/lib/layout'


const SubMenu = Menu.SubMenu

class Sidebar extends Component{
    componentWillMount(){
        this.props.getCurUser()
    }
    handleLogout = () => {
        this.props.onLogout();
    }
    render(){
        let openKeys = this.props.openNow === '' ? [] :[this.props.openNow] 
        const { user } = this.props
        return (
            <Sider>
                <div className='user-info'>
                    <div className='user-avatar'>
                        <img src='/public/img/test.JPG'></img>
                        <span className='user-name'>尊敬的{user.name}，您好！</span>
                    </div>
                </div>
                <Menu
                    defaultSelectedKeys={[this.props.currentMenu]}
                    selectedKeys={[this.props.currentMenu]}
                    openKeys={openKeys}
                    mode='inline'
                    >
                    <Menu.Item key='view'>
                        <Link to='/view'>个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key='process'>
                        <Link to='/process'>项目进度</Link>
                    </Menu.Item>
                    <Menu.Item key='project'>
                        <Link to='/project'>项目结构</Link>
                    </Menu.Item>
                    <Menu.Item key='document'>
                        <Link to='/document'>文档管理</Link>
                    </Menu.Item>
                    <SubMenu key='approval' title={<Link className='submenu-title' to='/approval/need'>质量审查</Link>}>
                        <Menu.Item key='need'>
                            <Link to='/approval/need'>待我审查</Link>
                        </Menu.Item>
                        <Menu.Item key='start'>
                            <Link to='/approval/start'>我的工作</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='daily' title={<Link className='submenu-title' to='/daily/all'>日报</Link>}>
                        <Menu.Item key='all'>
                            <Link to='/daily/all'>所有日报</Link>
                        </Menu.Item>
                        <Menu.Item key='my'>
                            <Link to='/daily/my'>我的日报</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='organization' title={<Link className='submenu-title' to='/organization/department'>部门及人员</Link>}>
                        <Menu.Item key='department'>
                            <Link to='/organization/department'>部门设置</Link>
                        </Menu.Item>
                        <Menu.Item key='stuff'>
                            <Link to='/organization/stuff'>员工管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='personal'>
                        <Link to='/personal'>我的资料</Link>
                    </Menu.Item>
                    <Menu.Item key='logout'>
                        <span className='logout' onClick={this.handleLogout}>退出系统</span> 
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar
