import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import ViewContainer from './containers/View'
import PersonalContainer from './containers/Personal'
import ProcessContainer from './containers/Process'
import ProjectContainer from './containers/Project'
import { Router, Route, browserHistory, IndexRoute, Redirect, Switch } from 'react-router'
import '../public/style/index.css'
import { Provider } from 'react-redux'
import configStore from './store'
import DepartmentContainer from './containers/Department'
import StaffContainer from './containers/Staff'
import AllDailyContainer from './containers/Daily'
import DailyContainer from './containers/MyDaily'
import DocumentContainer from './containers/Document'
import ApprovalContainer from './containers/NeedApproval'
import StartContainer from './containers/StartApproval'
import LoginContainer from './containers/Login'
import RegisterContainer from './containers/Register'

let store = configStore()
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={ViewContainer}></IndexRoute>
                <Route path='view' component={ViewContainer} />
                <Route path='personal' component={PersonalContainer} />
                <Route path='process' component={ProcessContainer} />
                <Route path='project' component={ProjectContainer} />
                <Route path='document' component={DocumentContainer}/>
                <Route path='organization' exact render={()=>{( <Redirect to='/organization/department' />)}}>
                    <Route path='department' component={DepartmentContainer} />
                    <Route path='stuff' component={StaffContainer} />
                </Route>
                <Route path='daily' exact render={()=>{( <Redirect to='/daily/all' />)}}>
                    <Route path='all' component={AllDailyContainer} />
                    <Route path='my' component={DailyContainer} />
                </Route>
                <Route path='approval' exact render={()=>{( <Redirect to='/approval/need' />)}}>
                    <Route path='need' component={ApprovalContainer} />
                    <Route path='start' component={StartContainer} />
                </Route>
            </Route>
            <Route path='/login' component={LoginContainer} />
            <Route path='/register' component={RegisterContainer} />
        </Router>
    </Provider>,
    document.getElementById('root')
)

