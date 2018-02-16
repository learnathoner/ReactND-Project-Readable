import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/lib/fa'

const SortBar = () => {
  return (
    <div className="sort-bar">
      <div className="sort-text">
        Sort By:
      </div>
      <div className="sort-date">
        Date <FaArrowDown onClick={(e) => console.log(e)}/> <FaArrowUp />
      </div>
      <div className="rating">
        Rating <FaArrowDown /> <FaArrowUp />
      </div>
      <div className="clear">
        Clear Sort
      </div>
    </div>
  )
}

export default SortBar