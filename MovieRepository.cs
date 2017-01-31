using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace MovieApi.Models
{
    public class MovieRepository : IMovieRepository
    {
        private static ConcurrentDictionary<int, MovieItem> _movies =
              new ConcurrentDictionary<int, MovieItem>();

        public MovieRepository()
        {
            Add(new MovieItem { Title = "Superfantastic Movie" });
        }

        public IEnumerable<MovieItem> GetAll()
        {
            return _movies.Values;
        }

        public MovieItem FindById(int id)
        {
            MovieItem item;
            _movies.TryGetValue(id, out item);
            return item;
        }
    }
}
