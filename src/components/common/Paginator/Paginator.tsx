import React, { useState } from 'react';
import styles from "./Paginator.module.css";
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({ portionSize = 20, totalItemsCount, pageSize, currentPage, onPageChanged }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Left</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</span>
            })}
        {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>Right</button>}
    </div >
}

export default Paginator;