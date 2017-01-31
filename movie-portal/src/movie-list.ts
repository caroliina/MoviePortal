import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class MovieList {
  movies;
  selectedId = 0;

  constructor(private api: WebAPI){ }

  created(){
    this.api.getMovieList().then(movies => this.movies = movies);
  }

  select(movie){
    this.selectedId = movie.id;
    return true;
  }
}