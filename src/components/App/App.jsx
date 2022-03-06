import React, { Component } from 'react'
import 'antd/dist/antd.min.css'
import { Alert, Tabs, Spin, Space } from 'antd'

import MovieList from '../MovieList/MovieList'
import './App.css'
import ApiService from '../../services/apiService'
import Header from '../Header/Header'
import PaginationMovies from '../PaginationMovies/PaginationMovies'
import GenreContext from '../../context/GenreContext'

const { TabPane } = Tabs
export default class App extends Component {
  movieApi = new ApiService()
  state = {
    movies: [],
    loading: false,
    error: false,
    inputValue: 'return',
    totalPages: 0,
    currentPages: 1,
    noResult: false,
    onRated: false,
    localStorageData: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue || prevState.currentPages !== this.state.currentPages) {
      this.searchFilms(this.state.currentPages, this.state.inputValue)
    }
  }
  onChangeTab = (value) => {
    if (value === '2') {
      this.setState({
        onRated: true,
        localStorageData: [...this.parseLocalStorage()],
      })
    } else {
      this.setState({
        onRated: false,
      })
    }
  }
  parseLocalStorage = () => {
    const res = []
    const keys = Object.keys(localStorage)
    for (const key of keys) {
      res.push(...JSON.parse(localStorage.getItem(key)))
    }

    return res
  }
  toLocalStorage = (stars, id) => {
    if (stars) {
      const ratedMovies = this.state.movies.reduce((acc, element) => {
        if (element.id === id) {
          element.voteStars = stars
          acc.push(element)
        }
        return acc
      }, [])
      localStorage.setItem(id, JSON.stringify(ratedMovies))
    } else {
      localStorage.removeItem(id)
      this.setState(({ localStorageData }) => localStorageData.filter((element) => element.id !== id))
    }
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }
  onInputChange = (value) => {
    this.setState({
      inputValue: value,
      loading: true,
      currentPages: 1,
      noResult: false,
    })
  }
  searchFilms = (page, value) => {
    this.movieApi
      .getAllMovies(page, value)
      .then((body) => {
        this.setState({
          movies: [...body.results],
          loading: false,
          totalPages: body.total_pages,
          noResult: !body.results.length,
        })
      })
      .catch(this.onError)
  }

  changePage = (page) => {
    this.setState({ loading: true })
    this.movieApi
      .getAllMovies(page, this.state.inputValue)

      .then((response) => {
        this.setState({
          movies: response.results,
          currentPages: page,
          loading: false,
        })
      })
  }

  render() {
    const { movies, error, inputValue, totalPages, currentPages, noResult, onRated, loading } = this.state
    if (!navigator.onLine) {
      return (
        <Alert
          message="Проблема с подключением. Проверьте ваше интернет-соединение и попробуйте снова"
          type="warning"
          className="alert"
        />
      )
    }
    if (error) {
      return <Alert message="Что-то пошло не так,но мы уже работаем над этим." type="error" className="alert" />
    }
    if (loading) {
      return (
        <div className="spin">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      )
    }

    if (noResult) {
      return (
        <section className="wrapper">
          <Tabs defaultActiveKey="1" className="tabs" onChange={this.onChangeTab}>
            <TabPane tab="Search" key="1" />
            <TabPane tab="Rated" key="2" />
          </Tabs>
          {!onRated ? <Header onInputChange={this.onInputChange} inputValue={inputValue} /> : null}
          <Alert message="Ничего не найдено" type="warning" />
        </section>
      )
    }
    if (!onRated) {
      return (
        <GenreContext>
          <section className="wrapper">
            <Tabs defaultActiveKey="1" className="tabs" onChange={this.onChangeTab}>
              <TabPane tab="Search" key="1" />
              <TabPane tab="Rated" key="2" />
            </Tabs>
            <Header onInputChange={this.onInputChange} inputValue={inputValue} />
            <MovieList movies={movies} toLocalStorage={this.toLocalStorage} onRated={onRated} />
            <PaginationMovies
              totalPages={totalPages}
              currentPages={currentPages}
              changePage={this.changePage}
              onRated={onRated}
            />
          </section>
        </GenreContext>
      )
    }

    return (
      <GenreContext>
        <section className="wrapper">
          <Tabs defaultActiveKey="1" className="tabs" onChange={this.onChangeTab}>
            <TabPane tab="Search" key="1" />
            <TabPane tab="Rated" key="2" />
          </Tabs>
          <MovieList movies={movies} toLocalStorage={this.toLocalStorage} onRated={onRated} />
          <PaginationMovies
            totalPages={totalPages}
            currentPages={currentPages}
            changePage={this.changePage}
            onRated={onRated}
          />
        </section>
      </GenreContext>
    )
  }
}
