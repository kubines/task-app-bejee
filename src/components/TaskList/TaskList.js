import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from 'components/Pagination'
import Panel from './Panel'
import Task from './Task'

const TaskList = () => {
    const dispatch = useDispatch()
    const [total_task_count, data] = useSelector(state => [state.total_task_count, state.data])
    const [params, setParams] = useState({
        developer: 'name',
        sort_field: '',
        sort_direction: 'asc',
        page: 1,
    })
    const [preloader, setPreloader] = useState(true)

    const fetchData = useCallback(async () => {
        setPreloader(true)
        const url = new URL('https://uxcandy.com/~shapoval/test-task-backend/v2')
        await Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: "GET",
        })
        const data = await res.json()
        data.message.tasks && dispatch({ type: 'SET_DATA', data: data.message.tasks, total_task_count: Number(data.message.total_task_count) })
    }, [params, dispatch])

    const changeParams = useCallback(
        params => {
            setParams(prevParams => ({ ...prevParams, ...params }))
        }, [])

    useEffect(() => {
        fetchData()
    }, [params, preloader, fetchData])

    return (
        <React.Fragment>
            <Panel
                changeParams={changeParams}
                sort_field={params.sort_field}
                sort_direction={params.sort_direction}
            />
            {
                data.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        username={task.username}
                        email={task.email}
                        text={task.text}
                        status={task.status}
                        editAdmin={task.editAdmin}
                    />
                ))
            }
            {
                total_task_count > 1 &&
                <Pagination
                    changeParams={changeParams}
                    total_task_count={total_task_count}
                    page={params.page}
                />
            }
        </React.Fragment>
    )
}

export default TaskList
