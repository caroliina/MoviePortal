import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    
  router: Router;
    
  configureRouter(config, router){
    config.title = 'Movie Portal';
    config.map([
      { route: '', moduleId: 'no-selection', title: 'Movies'},
      { route: 'movies/:id', moduleId: 'movie-detail', name: 'movies'}
    ]);

    this.router = router;
  }
}
