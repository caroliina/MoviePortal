import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';
import {areEqual} from './utility';

interface Movie {
  title: string;
  category: string;
  rating: number;
  year: string;
}

@inject(WebAPI)
export class MovieDetail {
  routeConfig;
  movie: Movie;
  originalMovie: Movie;

  constructor(private api: WebAPI) { }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getMovieById(params.id).then(movie => {
      this.movie = <Movie>movie;
      this.routeConfig.navModel.setTitle(this.movie.title);
      this.originalMovie = JSON.parse(JSON.stringify(this.movie));
    });
  }

}