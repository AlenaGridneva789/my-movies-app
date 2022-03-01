import React, {Component} from "react"
import { Rate } from 'antd'
import'./Film.css'
import {format} from "date-fns";
import notFound from "../../img/notFound.png";

export default class Task extends Component {
   
   // urlPoster = `https://image.tmdb.org/t/p/w500${this.props.poster}`
    shortenText = (text) =>{
        
        const arr = text.split(' ')
        arr.splice(25);
        return `${arr.join(' ')}...`
       
    }
    
    onChangeRate = (stars) => {
     this.props.toLocalStorage(stars, this.props.id)
    }
    getRate = JSON.parse(localStorage.getItem(this.props.id))

   
        render() {
        const {title,overview,date,poster} = this.props
        
        return(
            
              <li className="card">
                 
               <div className="img-wrapper">
                  <img src= {poster ? `https://image.tmdb.org/t/p/w500${poster}` : notFound} alt="poster" className="img" width={183} height="100%"/>  
               </div>
               <div className="card__wrapper">
                   <div className="title__wrapper">
                      <span className="title">{title}</span>
                   </div>
                   <div className="date__wrapper">
                       <span className="date">{format(date ? new Date(date) : new Date(), 'MMMM dd, yyyy')}</span>
                   </div>
                   
                   <div className="ganre-wrapper">
                   
                   </div>
                   <div className="description__wrapper">
                        <p className="description__text">{this.shortenText(overview)}</p>
                   </div>
                   <div>
                       <Rate  count={10} onChange={this.onChangeRate} defaultValue={this.getRate && this.getRate[0]?.voteStars}/>
                   </div>
               </div>

            </li>  
        )
    }
}