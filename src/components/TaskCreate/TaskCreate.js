import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import './task-create.scss'

const TaskCreate = () => {
    const dispatch = useDispatch()
    const initTask = {
        username: '',
        email: '',
        text: '',
        status: 0,
    }

    const [task, setTask] = useState(initTask)
    const [error, setError] = useState({})
    const [success, setSuccess] = useState('')
    const [preloader, setPreloader] = useState(false)

    const postData = useCallback(async (e) => {
        e.preventDefault()
        setPreloader(true)
        setError({})
        setSuccess('')
        const form = new FormData()
        form.append("username", task.username)
        form.append("email", task.email)
        form.append("text", task.text)
        form.append("status", task.status)

        const url = new URL('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=name')
        const res = await fetch(url, {
            headers: {},
            method: "POST",
            body: form,
        })
        const data = await res.json()
        if (data.status === 'ok') {
            setTask(initTask)
            setSuccess('Задача успешна сохранена')
            dispatch({ type: 'ADD_TASK', data: data.message })
        }
        else {
            setError(data.message)
        }
        data && setPreloader(false)
    }, [dispatch, task, initTask])

    return (
        <form className={`form ${preloader ? 'form_disable' : ''}`} onSubmit={postData}>
            <span className='form__success'>
                {success}
            </span>
            <label>
                Имя:
            </label>
            <span className='form__error'>
                {error.username}
            </span>
            <input
                type='text'
                name='username'
                value={task.username}
                onChange={e => setTask({ ...task, username: e.target.value })}
            />
            <label>
                Почта:
            </label>
            <span className='form__error'>
                {error.email}
            </span>
            <input
                type='email'
                name="email"
                value={task.email}
                onChange={e => setTask({ ...task, email: e.target.value })}
            />
            <label>
                Задача:
            </label>
            <span className='form__error'>
                {error.text}
            </span>
            <textarea
                type='text'
                name='text'
                value={task.text}
                onChange={e => setTask({ ...task, text: e.target.value })}
            />
            <div
                className='form__status'
            >
                <label>
                    Выполнена
                    <input
                        type="radio"
                        value={0}
                        checked={task.status === 0}
                        onChange={() => setTask(task => ({ ...task, status: 0 }))}
                    />
                </label>
                <label>
                    Не выполнена
                    <input
                        type="radio"
                        value={10}
                        checked={task.status === 10}
                        onChange={() => setTask(task => ({ ...task, status: 10 }))}
                    />
                </label>
            </div>
            <button
                type="submit"
            >
                Добавить
            </button>
        </form>
    )
}

export default TaskCreate
