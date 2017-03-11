import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import ProjectApp from './reducers'

const loggerMiddleware = createLogger()

export default function configStore(preloadedState) {
    return createStore(
        ProjectApp,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
