define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Movie Portal';
            config.map([
                { route: '', moduleId: 'no-selection', title: 'Movies' },
                { route: 'movies/:id', moduleId: 'movie-detail', name: 'movies' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('web-api',["require", "exports", "aurelia-http-client"], function (require, exports, aurelia_http_client_1) {
    "use strict";
    var client = new aurelia_http_client_1.HttpClient();
    var latency = 200;
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
        }
        WebAPI.prototype.getMovieList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = client.get('http://localhost:50390/api/movies')
                        .then(function (data) {
                        resolve(JSON.parse(data.response));
                    });
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getMovieById = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = client.get('http://localhost:50390/api/movies/' + id)
                        .then(function (data) {
                        resolve(JSON.parse(data.response));
                    });
                    _this.isRequesting = false;
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('movie-detail',["require", "exports", "aurelia-framework", "./web-api"], function (require, exports, aurelia_framework_1, web_api_1) {
    "use strict";
    var MovieDetail = (function () {
        function MovieDetail(api) {
            this.api = api;
        }
        MovieDetail.prototype.activate = function (params, routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            return this.api.getMovieById(params.id).then(function (movie) {
                _this.movie = movie;
                _this.routeConfig.navModel.setTitle(_this.movie.title);
                _this.originalMovie = JSON.parse(JSON.stringify(_this.movie));
            });
        };
        return MovieDetail;
    }());
    MovieDetail = __decorate([
        aurelia_framework_1.inject(web_api_1.WebAPI),
        __metadata("design:paramtypes", [web_api_1.WebAPI])
    ], MovieDetail);
    exports.MovieDetail = MovieDetail;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('movie-list',["require", "exports", "./web-api", "aurelia-framework"], function (require, exports, web_api_1, aurelia_framework_1) {
    "use strict";
    var MovieList = (function () {
        function MovieList(api) {
            this.api = api;
            this.selectedId = 0;
        }
        MovieList.prototype.created = function () {
            var _this = this;
            this.api.getMovieList().then(function (movies) { return _this.movies = movies; });
        };
        MovieList.prototype.select = function (movie) {
            this.selectedId = movie.id;
            return true;
        };
        return MovieList;
    }());
    MovieList = __decorate([
        aurelia_framework_1.inject(web_api_1.WebAPI),
        __metadata("design:paramtypes", [web_api_1.WebAPI])
    ], MovieList);
    exports.MovieList = MovieList;
});

define('no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSelection = (function () {
        function NoSelection() {
            this.message = "Please Select a Movie.";
        }
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./movie-list\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><i class=\"fa fa-user\"></i> <span>Movie Portal</span></a></div></nav><div class=\"container\"><div class=\"row\"><movie-list class=\"col-md-4\"></movie-list><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!movie-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Movie</h3></div><div class=\"panel-body\"><form role=\"form\" class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Title</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Title\" class=\"form-control\" value.bind=\"movie.title\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Category</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Category\" class=\"form-control\" value.bind=\"movie.category\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Rating</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Rating\" class=\"form-control\" value.bind=\"movie.rating\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Year</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Year\" class=\"form-control\" value.bind=\"movie.year\"></div></div></form></div></div></template>"; });
define('text!movie-list.html', ['module'], function(module) { module.exports = "<template><div class=\"movie-list\"><ul class=\"list-group\"><li repeat.for=\"movie of movies\" class=\"list-group-item ${movie.id === $parent.selectedId ? 'active' : ''}\"><a route-href=\"route: movies; params.bind: {id:movie.id}\" click.delegate=\"$parent.select(movie)\"><h4 class=\"list-group-item-heading\">${movie.title}</h4></a></li></ul></div></template>"; });
define('text!no-selection.html', ['module'], function(module) { module.exports = "<template><div class=\"no-selection text-center\"><h2>${message}</h2></div></template>"; });
//# sourceMappingURL=app-bundle.js.map