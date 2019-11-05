import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './components/Header'
import TaskCreate from './components/TaskCreate'
import TaskList from './components/TaskList'

import './app.scss'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        sessionStorage.getItem('token') && dispatch({ type: 'SET_LOGIN' })
    }, [dispatch])

    return (
        <React.Fragment>
            <Header />
            <div className='container'>
                <TaskCreate />
                <TaskList />
            </div>
        </React.Fragment>

    )
}

export default App
