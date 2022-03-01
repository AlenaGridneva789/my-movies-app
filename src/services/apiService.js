export default class ApiService {

  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8e3ef0d498e3f340a2d177dea4da3175';
  _apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8e3ef0d498e3f340a2d177dea4da3175';
 

 async getResource(url) {
  const response = await fetch(`${this._apiBase}${url}`);
  if(!response.ok) {
    throw new Error(`Could not fetch ${url}` +
     `,received ${response.status}`)
  }
  
  const result = await response.json();
  return result;
}
/*async getAllMovies(){
  const res = await this.getResource(`&query=return`);
  return res;
}*/
async getAllMovies(page,str){
  const res = await this.getResource(`&page=${page}&query=${str}`);
  return res;
}
async getResourceGenre() {
  const response = await fetch(`${this._apiGenre}`);
  if(!response.ok) {
    throw new Error(`Could not fetch ${this._apiGenre}, received ${response.status}`)
  }
  const result = await response.json();
  return result;
}
async getGenre() {
const res = await this.getResourceGenre();
return res.genres;
}

}
