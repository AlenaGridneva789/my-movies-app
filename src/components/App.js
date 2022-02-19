import React, { Component } from 'react'
import MovieList from './MovieList';
import './App.css';
import SwapiService from '../services/api-services';


export default class App extends Component{
    movieApi = new SwapiService();
    state = {
        movies: [],
        genres: []
            
    }
    constructor(){
        super();
        this.searchFilms()
        this.getGenresFilm()

    }
    searchFilms = () =>{
        this.movieApi.getAllMovies()
        .then((body)=>{
        
            this.setState({
                
                movies: [...body.results]
            })
            
        })
    }
    getGenresFilm = () =>{
        this.movieApi.getGenre()
        .then((genres)=>{
           
           this.setState({
               genres: [...genres.genres]
            })
        })
    }

    render(){
    const {movies,genres} = this.state;
     return(

         <section className='wrapper'>
            
             <MovieList movies = {movies} genres = {genres} />
         </section>
     )
 }
}
