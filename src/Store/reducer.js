const initState = {
    data: [],
    total_task_count: 0,
    login: false,
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.data,
                total_task_count: action.total_task_count,
            }
        case 'ADD_TASK':
            return {
                ...state,
                data: state.data.lentgh < 3 ? [...state.data, action.data] : state.data,
                total_task_count: state.total_task_count + 1
            }
        case 'EDIT_TASK':
            return {
                ...state,
                data: state.data.map(task => task.id === action.data.id ? {...action.data, editAdmin: task.text !== action.data.text && true} : task),
            }
        case 'SET_LOGIN':
            return {
                ...state,
                login: true,
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                login: false,
            }
        default:
            return state
    }
}

export default reducer