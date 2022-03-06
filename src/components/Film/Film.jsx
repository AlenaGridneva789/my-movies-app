import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
import './Film.css'
import { format } from 'date-fns'

import notFound from '../../img/notFound.png'
import { Context } from '../../context/GenreContext'

const Film = ({ title, id, poster, genre, overview, date, vote, toLocalStorage }) => {
  const voteColor = (num) => {
    if (num < 3) return '#E90000'
    if (num >= 3 && num < 5) return '#E97E00'
    if (num >= 5 && num < 7) return '#E9D100'
    if (num >= 7) return '#66E900'

    return true
  }

  const shortenText = (text) => {
    const arr = text.split(' ')
    arr.splice(25)
    return `${arr.join(' ')}...`
  }

  const onChangeRate = (stars) => {
    toLocalStorage(stars, id)
  }
  const getRate = JSON.parse(localStorage.getItem(id))

  const allGenres = React.useContext(Context)

  const genresFinding = (allG, films) => allG.filter((genreId) => films.includes(genreId.id)).map((el) => el.name)

  const items = genresFinding(allGenres, genre)

  const filmGenres = items.map((element) => <span key={element}>{element}</span>)

  return (
    <li className="card">
      <div className="img-wrapper">
        <img
          src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : notFound}
          alt="poster"
          className="img"
          width={183}
          height="100%"
        />
      </div>
      <div className="card__wrapper">
        <div className="title__wrapper">
          <span className="title">{title}</span>
          <span className="vote" style={{ border: `2px solid ${voteColor(vote)}` }}>
            {vote}
          </span>
        </div>

        <span className="date">{format(date ? new Date(date) : new Date(), 'MMMM dd, yyyy')}</span>

        <span className="genre">{filmGenres.length ? filmGenres : <span>---</span>}</span>

        <div className="description__wrapper">
          <p className="description__text">{shortenText(overview)}</p>
        </div>

        <Rate
          allowHalf
          className="stars"
          count={10}
          onChange={onChangeRate}
          defaultValue={getRate && getRate[0]?.voteStars}
        />
      </div>
    </li>
  )
}

Film.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  poster: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.number),
  overview: PropTypes.string,
  date: PropTypes.string,
  vote: PropTypes.number,
  toLocalStorage: PropTypes.func,
}

Film.defaultProps = {
  title: '',
  id: 0,
  poster: '',
  genre: [],
  overview: '',
  date: '',
  vote: 0,
  toLocalStorage: () => {},
}
export default Film
