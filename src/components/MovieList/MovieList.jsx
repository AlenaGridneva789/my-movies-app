import React from 'react'
import PropTypes from 'prop-types'

import Film from '../Film/Film'
import './MovieList.css'

const MovieList = ({ movies, genres, toLocalStorage, onRated }) => {
  const element = <MovieListView movies={movies} genres={genres} toLocalStorage={toLocalStorage} onRated={onRated} />
  return <ul className="movie-list">{element}</ul>
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.number),
  toLocalStorage: PropTypes.func,
  onRated: PropTypes.bool,
}
MovieList.defaultProps = {
  movies: [],
  genres: [],
  toLocalStorage: () => {},
  onRated: false,
}
export default MovieList

const MovieListView = ({ movies, toLocalStorage, onRated }) => {
  const parseLocalStorage = () => {
    const result = []
    const keys = Object.keys(localStorage)
    for (const key of keys) {
      result.push(...JSON.parse(localStorage.getItem(key)))
    }
    return result
  }

  const renderData = onRated ? parseLocalStorage() : movies

  const element = renderData.map((el) => (
    <Film
      key={el.id}
      id={el.id}
      genre={el.genre_ids}
      title={el.title}
      poster={el.poster_path}
      overview={el.overview}
      date={el.release_date}
      voteStars={el.voteStars}
      toLocalStorage={toLocalStorage}
      onRated={onRated}
      vote={el.vote_average}
    />
  ))

  return <>{element}</>
}
MovieListView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  toLocalStorage: PropTypes.func,
  onRated: PropTypes.bool,
}
MovieListView.defaultProps = {
  movies: [],
  toLocalStorage: () => {},
  onRated: false,
}
