export default class ApiService {
  apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=8e3ef0d498e3f340a2d177dea4da3175'
  apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8e3ef0d498e3f340a2d177dea4da3175'

  async getResource(url) {
    const response = await fetch(`${this.apiBase}${url}`)
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}` + `,received ${response.status}`)
    }
    const result = await response.json()
    return result
  }

  async getAllMovies(page, str) {
    const res = await this.getResource(`&page=${page}&query=${str}`)
    return res
  }
  async getResourceGenre() {
    const response = await fetch(`${this.apiGenre}`)
    if (!response.ok) {
      throw new Error(`Could not fetch ${this.apiGenre}, received ${response.status}`)
    }
    const result = await response.json()
    return result
  }
  async getGenres() {
    const res = await this.getResourceGenre()
    return res.genres
  }
}
