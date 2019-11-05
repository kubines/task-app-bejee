import React, { memo } from 'react'

import './panel.scss'

const Panel = ({ changeParams, sort_field, sort_direction }) => {
    return (
        <React.Fragment>
            <nav className='panel'>
                <span>
                    Сортировать по:
                </span>
                <ul className='panel__list'>
                    <li
                        className={sort_field === 'username' ? 'panel__list_active' : ''}
                        onClick={() => changeParams(sort_field === 'username' ? { sort_field: '' } : { sort_field: 'username' })}
                    >
                        имени
                    </li>
                    <li
                        className={sort_field === 'email' ? 'panel__list_active' : ''}
                        onClick={() => changeParams(sort_field === 'email' ? { sort_field: '' } : { sort_field: 'email' })}
                    >
                        почте
                    </li>
                    <li
                        className={sort_field === 'status' ? 'panel__list_active' : ''}
                        onClick={() => changeParams(sort_field === 'status' ? { sort_field: '' } : { sort_field: 'status' })}
                    >
                        статусу
                    </li>
                </ul>
            </nav>
            <nav className='panel'>
                <span>
                    Сортировать по:
                </span>
                <ul className='panel__list'>
                    <li
                        className={sort_direction === 'asc' ? 'panel__list_active' : ''}
                        onClick={() => changeParams({ sort_direction: 'asc' })}
                    >
                        возрастанию
                    </li>
                    <li
                        className={sort_direction === 'desc' ? 'panel__list_active' : ''}
                        onClick={() => changeParams({ sort_direction: 'desc' })}
                    >
                        убыванию
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default memo(Panel)
