using System.Collections.Generic;

namespace MovieApi.Models
{
    public interface IMovieRepository
    {
        IEnumerable<MovieItem> GetAll();
        MovieItem FindById(int id);
    }
}
