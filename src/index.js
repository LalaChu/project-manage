import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import View from './components/View'
import Personal from './components/Personal'
import Process from './components/Process'
import Project from './components/Project'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import '../public/style/index.css'
import { createStore } from 'redux'
import ProjectApp from './reducers'
import { Provider } from 'react-redux'

let store = createStore(ProjectApp)

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={View}/>
                <Route path='view' component={View} />
                <Route path='personal' component={Personal} />
                <Route path='process' component={Process} />
                <Route path='project' component={Project} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
