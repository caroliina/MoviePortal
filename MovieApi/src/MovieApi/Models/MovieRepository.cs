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
            Add(new MovieItem { Id = 1, Title = "Harry Potter", Category = "fantasy", Rating = 5, Year = "2014" });
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

        public void Add(MovieItem item)
        {
            _movies[item.Id] = item;
        }
    }
}
