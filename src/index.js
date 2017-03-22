import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import View from './components/View'
import Personal from './components/Personal'
import Process from './components/Process'
import ProjectContainer from './containers/Project'
import { Router, Route, browserHistory, IndexRoute, Redirect, Switch } from 'react-router'
import '../public/style/index.css'
import { Provider } from 'react-redux'
import configStore from './store'
import DepartmentContainer from './containers/Department'
import StaffContainer from './containers/Staff'
import AllDaily from './components/AllDaily'
import DailyContainer from './containers/MyDaily'
import DocumentContainer from './containers/Document'
import NeedApproval from './components/NeedApproval'
import StartApproval from './components/StartApproval'
import LoginContainer from './containers/Login'
import RegisterContainer from './containers/Register'

let store = configStore()
console.log(store.getState())
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {/*<Switch>*/}
            <Route path='/' component={App}>
                <IndexRoute component={View}></IndexRoute>
                <Route path='view' component={View} />
                <Route path='personal' component={Personal} />
                <Route path='process' component={Process} />
                <Route path='project' component={ProjectContainer} />
                <Route path='document' component={DocumentContainer}/>
                <Route path='organization' exact render={()=>{( <Redirect to='/organization/department' />)}}>
                    <Route path='department' component={DepartmentContainer} />
                    <Route path='stuff' component={StaffContainer} />
                </Route>
                <Route path='daily' exact render={()=>{( <Redirect to='/daily/all' />)}}>
                    <Route path='all' component={AllDaily} />
                    <Route path='my' component={DailyContainer} />
                </Route>
                <Route path='approval' exact render={()=>{( <Redirect to='/approval/need' />)}}>
                    <Route path='need' component={NeedApproval} />
                    <Route path='start' component={StartApproval} />
                </Route>
                {/*<Route component={View}></Route>*/}
            </Route>
            <Route path='/login' component={LoginContainer} />
            <Route path='/register' component={RegisterContainer} />
            {/*<Redirect from='/' to='/view'></Redirect>*/}
            {/*</Switch>*/}
        </Router>
    </Provider>,
    document.getElementById('root')
)

