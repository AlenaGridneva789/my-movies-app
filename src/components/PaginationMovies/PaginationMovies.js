import React from "react";
import { Pagination } from "antd";
import './PaginationMovies.css';

const PaginationMovies = ({currentPages,totalPages,changePage}) => {
  return( <Pagination className="pagination"
                defaultCurrent={1}
                current={currentPages}
                total={`${totalPages}`}
                onChange={changePage}
                size="small"
                />)
}
export default PaginationMovies