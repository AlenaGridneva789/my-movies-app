import React from 'react'
import PropTypes from 'prop-types'

import ApiService from '../services/apiService'

export const Context = React.createContext()

export default class GenreContext extends React.Component {
  state = {
    genres: [],
  }

  movieAPI = new ApiService()

  componentDidMount() {
    this.movieAPI.getGenres().then((genres) => {
      this.setState({
        genres: [...genres],
      })
    })
  }

  render() {
    return <Context.Provider value={this.state.genres}>{this.props.children}</Context.Provider>
  }
}

GenreContext.propTypes = {
  children: PropTypes.node,
}

GenreContext.defaultProps = {
  children: 'any',
}
