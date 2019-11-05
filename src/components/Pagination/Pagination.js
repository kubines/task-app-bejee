import React, { useState, useEffect, memo } from 'react'

import './pagination.scss'

const Pagination = ({ changeParams, total_task_count, page }) => {
    const [pages, setPages] = useState([])

    const startPagination = () => page < 4 ? 0 : (page > pages.length - 3 ? pages.length - 5 : page - 3)

    const endPagination = () => page < 4 ? 5 : (page > pages.length - 3 ? pages.length : page + 2)

    const prevPage = () => {
        page !== 1 && changeParams({ page: --page })
    }

    const nextPage = () => {
        page !== pages[pages.length - 1] && changeParams({ page: ++page })
    }

    useEffect(() => {
        for (let i = 1; i <= Math.ceil(total_task_count / 3); i++) {
            setPages(pages => [...pages, i])
        }
    }, [total_task_count])

    return (
        <nav>
            <ul
                className='pagination'
            >
                <li
                    onClick={prevPage}
                >
                    <a
                        href='!#'
                    >
                        {'<'}
                    </a>
                </li>
                {
                    pages.slice(startPagination(), endPagination()).map(number => (
                        <li
                            key={number}
                            onClick={() => changeParams({ page: number })}
                            className={number === page ? `pagination_active` : ''}
                        >
                            <a
                                href='!#'
                            >
                                {number}
                            </a>
                        </li>
                    ))
                }
                <li
                    onClick={nextPage}
                >
                    <a
                        href='!#'
                    >
                        {'>'}
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Pagination)
