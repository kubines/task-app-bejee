import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginModal from './LoginModal'

import './header.scss'

const Header = () => {
    const [login] = useSelector(state => [state.login])
    const dispatch = useDispatch()
    const [loginModal, setLoginModal] = useState(false)
    const setCloseLogin = useCallback(() => {
        setLoginModal(false)
        document.body.style.overflow = 'auto'
    }, [])
    const setOpenLogin = useCallback(() => {
        setLoginModal(true)
        document.body.style.overflow = 'hidden'
    }, [])

    const logOut = () => {
        sessionStorage.removeItem('token')
        dispatch({ type: 'SET_LOGOUT' })
    }

    return (
        <React.Fragment>
            <header>
                <div className='container'>
                    {
                        login ?
                            <span
                                onClick={logOut}
                            >
                                Выйти
                            </span>
                            :
                            <span
                                onClick={setOpenLogin}
                            >
                                Авторизация
                            </span>
                    }
                </div>
            </header>
            {
                loginModal &&
                <LoginModal
                    setCloseLogin={setCloseLogin}
                />
            }
        </React.Fragment>

    )
}

export default Header
