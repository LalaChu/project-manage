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
import Department from './components/Department'
import Stuff from './components/Stuff'
import Authority from './components/Authority'
import AllDaily from './components/AllDaily'
import MyDaily from './components/MyDaily'
import Document from './components/Document'
import NeedApproval from './components/NeedApproval'
import StartApproval from './components/StartApproval'
import LoginContainer from './containers/Login'
import Register from './components/Register'

let store = configStore()
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
                <Route path='document' component={Document}/>
                <Route path='organization' exact render={()=>{( <Redirect to='/organization/department' />)}}>
                    <Route path='department' component={Department} />
                    <Route path='stuff' component={Stuff} />
                    <Route path='authority' component={Authority}/>
                </Route>
                <Route path='daily' exact render={()=>{( <Redirect to='/daily/all' />)}}>
                    <Route path='all' component={AllDaily} />
                    <Route path='my' component={MyDaily} />
                </Route>
                <Route path='approval' exact render={()=>{( <Redirect to='/approval/need' />)}}>
                    <Route path='need' component={NeedApproval} />
                    <Route path='start' component={StartApproval} />
                </Route>
                {/*<Route component={View}></Route>*/}
            </Route>
            <Route path='/login' component={LoginContainer} />
            <Route path='/register' component={Register} />
            {/*<Redirect from='/' to='/view'></Redirect>*/}
            {/*</Switch>*/}
        </Router>
    </Provider>,
    document.getElementById('root')
)

