import React from 'react'
import { Pagination } from 'antd'
import './PaginationMovies.css'
import PropTypes from 'prop-types'
const PaginationMovies = ({ currentPages, totalPages, changePage }) => {
  return (
    <Pagination
      className="pagination"
      defaultCurrent={1}
      current={currentPages}
      total={`${totalPages}`}
      onChange={changePage}
      size="small"
    />
  )
}

PaginationMovies.propTypes = {
  currentPages: PropTypes.number,
  totalPages: PropTypes.number,
  changePage: PropTypes.func,
}
PaginationMovies.defaultProps = {
  currentPages: 1,
  totalPages: 1,
  changePage: () => {},
}
export default PaginationMovies
