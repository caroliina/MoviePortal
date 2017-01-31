import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();
let latency = 200;

export class WebAPI {
  isRequesting = false;
  
  getMovieList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = client.get('http://localhost:50390/api/movies')
        .then(data => {       
            resolve(JSON.parse(data.response));
        });
        this.isRequesting = false;
      }, latency);
    });
  }

  getMovieById(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = client.get('http://localhost:50390/api/movies/' + id)
        .then(data => {       
            resolve(JSON.parse(data.response));
        });
        this.isRequesting = false;
      }, latency);
    });
  }
}
