using System.Collections.Generic;

namespace MovieApi.Models
{
    public interface IMovieRepository
    {
        IEnumerable<TodoItem> GetAll();
        TodoItem FindById(int id);
    }
}
