import React, { useState, useCallback, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './task.scss'

const Task = ({ username, email, text, status, id, editAdmin }) => {
    const dispatch = useDispatch()
    const [login] = useSelector(state => [state.login])
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState({})
    const [preloader, setPreloader] = useState(false)
    const [task, setTask] = useState({ text: text, status: status })

    const postData = useCallback(async e => {
        e.preventDefault()
        setPreloader(true)
        setError({})
        const form = new FormData()
        let token = () => sessionStorage.getItem('token')
        form.append("text", task.text)
        form.append("status", task.status)
        form.append("token", token)
        const url = new URL(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=name`)
        const res = await fetch(url, {
            headers: {},
            method: "POST",
            body: form,
        })
        const data = await res.json()
        if (data.status === 'ok') {
            setEdit(false)
            dispatch({ type: 'EDIT_TASK', data: { id, username, email, text: task.text, status: task.status } })
        }
        else {
            if (data.message.token) {
                dispatch({ type: 'SET_LOGOUT' })
                sessionStorage.removeItem('token')
                setEdit(false)
            }
            setError(data.message)
        }
        setPreloader(false)
    }, [dispatch, task, id, username, email])

    return (
        <div className='task'>
            <div className='task__user'>
                <p>
                    Имя: {username}
                </p>
                <p>
                    Почта: {email}
                </p>
            </div>
            {
                edit ?
                    <React.Fragment>
                        <form onSubmit={postData} className={`form ${preloader ? 'form_disable' : ''}`}>
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
                                        checked={task.status === 10}
                                        onChange={() => setTask(task => ({ ...task, status: 10 }))}
                                    />
                                </label>
                                <label>
                                    Не выполнена
                                     <input
                                        type="radio"
                                        value={10}
                                        checked={task.status === 0}
                                        onChange={() => setTask(task => ({ ...task, status: 0 }))}
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                            >
                                Сохранить
                        </button>
                        </form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p className='task__text'>
                            <span>
                                Задача:
                            </span>
                            {text}
                        </p>
                        <p className='task__status'>
                            {
                                status === 0 ? 'Не выполнена' : 'Выполнена'
                            }
                        </p>
                        <p className='task__status'>
                            {
                                editAdmin && 'Отредактировано администратором'
                            }
                        </p>
                    </React.Fragment>
            }
            {
                login && !edit &&
                <button
                    type='buttons'
                    onClick={() => setEdit(true)}
                >
                    Редактировать
                </button>
            }
        </div>
    )
}

export default memo(Task)
