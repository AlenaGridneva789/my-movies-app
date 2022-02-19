

import Film from './Film'
import './MovieList.css'
const MovieList = ({movies,genres}) => {
    
    const element = movies.map((item) => {
    let iname = []
    
    let ids = item.genre_ids
    
    // eslint-disable-next-line array-callback-return
    genres.map((item) => {

        for(let i = 0; ids.length > i; i++){
            
            if(ids.includes(item.id) && !iname.includes(item.name)){
               
                iname.push(item.name); 
               
                } 
             
                return iname
        }
        }
        )
        const {id,genre_ids,title,poster_path,overview,release_date, ...itemProps} = item
        return (
                   <Film key ={id} {...itemProps} 
                     genre = {genre_ids}
                     title ={title} 
                     poster={poster_path}
                     overview={overview}
                     date={release_date}
                     genreName={iname}
                     />
    )
                     
                
    })
    return (
          <ul className='movie-list'>{element}</ul>
         
    )      
}
export default MovieList
