
import Film from '../Film/Film'
import './MovieList.css'

const MovieList = ({movies, genres, toLocalStorage, onRated, parseLocalStorage}) => {
    
    const element = <MovieListView movies={movies} genres={genres} toLocalStorage={toLocalStorage} onRated={onRated} />
    return (
        <ul className='movie-list'>
            {element} 
        </ul>
    )   
}

export default MovieList;

const MovieListView = ({ movies, toLocalStorage, onRated}) => {
    const parseLocalStorage = () => {
        const result = [];
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          result.push(...JSON.parse(localStorage.getItem(key)));
        }
        return result;
 }


 const renderData = onRated ? parseLocalStorage () : movies;

 const element = renderData.map((el) => (
    <Film key ={el.id}  
    id={el.id}
    genre = {el.genre_ids}
    title ={el.title} 
    poster={el.poster_path}
    overview={el.overview}
    date={el.release_date}
    genreName={el.iname}
    voteStars={el.voteStars}
    toLocalStorage={toLocalStorage}
    onRated={onRated}
    />
 ))

 return (
     <>
     {element}
     </>
    
 )
}    