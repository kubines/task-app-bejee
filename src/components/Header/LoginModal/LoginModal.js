import React, { useState, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'

import './login-modal.scss'

const LoginModal = ({ setCloseLogin }) => {
    const dispatch = useDispatch()
    const initLogin = {
        username: '',
        password: '',
    }
    const [login, setLogin] = useState(initLogin)
    const [error, setError] = useState({})
    const [preloader, setPreloader] = useState(false)
    const postData = useCallback(async e => {
        e.preventDefault()
        setPreloader(true)
        const form = await new FormData()
        form.append("username", login.username)
        form.append("password", login.password)
        const url = new URL('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=name')
        const res = await fetch(url, {
            headers: {},
            method: "POST",
            body: form,
        })
        const data = await res.json()
        if (data.status === 'ok') {
            sessionStorage.setItem('token', data.message.token)
            dispatch({ type: 'SET_LOGIN' })
            setCloseLogin()
        }
        else {
            setError(data.message)
            setPreloader(false)
        }
    }, [dispatch, login, setCloseLogin])

    return (
        <React.Fragment>
            <div className='modal'>
                <form className={`form ${preloader ? 'form_disable' : ''}`} onSubmit={postData}>
                    <label>
                        Имя:
                    </label>
                    <span className='form__error'>
                        {error.username}
                    </span>
                    <input
                        type='text'
                        name='username'
                        value={login.username}
                        onChange={e => setLogin({ ...login, username: e.target.value })}
                    />
                    <label>
                        Пороль:
                    </label>
                    <span className='form__error'>
                        {error.password}
                    </span>
                    <input
                        type='password'
                        name='email'
                        value={login.password}
                        onChange={e => setLogin({ ...login, password: e.target.value })}
                    />
                    <button
                        type='submit'
                    >
                        войти
                    </button>
                    <button
                        type='button'
                        onClick={setCloseLogin}
                    >
                        закрыть
                    </button>
                </form>
            </div>
            <div
                className='overlay'
                onClick={setCloseLogin}
            ></div>
        </React.Fragment>
    )
}

export default memo(LoginModal)
