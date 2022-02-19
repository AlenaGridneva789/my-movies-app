import React, {Component} from "react"
import'./Film.css'
import {format} from "date-fns";

export default class Task extends Component {
   
    urlPoster = `https://image.tmdb.org/t/p/w500${this.props.poster}`
    shortenText = (text) =>{
        
        const arr = text.split(' ')
        arr.splice(25);
        return `${arr.join(' ')}...`
       
    }
    
    render() {
        const {title,overview,date,genreName} = this.props
        
        return(
            
              <li className="card">
                 
               <div className="img-wrapper">
                  <img src= {this.urlPoster} alt="poster" className="img" width={183} height="100%"/>  
               </div>
               <div className="card__wrapper">
                   <div className="title__wrapper">
                      <span className="title">{title}</span>
                   </div>
                   <div className="date__wrapper">
                       <span className="date">{format(new Date(date),'MMMM dd, yyyy')}</span>
                   </div>
                   
                   <div className="ganre-wrapper">
                   {genreName
                   .map(item => <span className="ganre">{item}</span>)
                   .reduce((acc, x) => acc === null ? x : <>{acc}  {x}</>, null)}
                   </div>
                   <div className="description__wrapper">
                       
                        <p className="description__text">{this.shortenText(overview)}</p>
                   </div>
               </div>

            </li>  
           
            
        )
    }
}