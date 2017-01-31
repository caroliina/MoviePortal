using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace MovieApi.Controllers
{
    [Route("api/movie")]
    public class MovieController : Controller
    {
        public MovieController(IMovieRepository movieItems)
        {
            MovieItems = movieItems;
        }

        public IMovieRepository MovieItems { get; set; }

        [HttpGet]
        public IEnumerable<TodoItem> GetAll()
        {
            return MovieItems.GetAll();
        }

        [HttpGet("{id}", Name = "GetMovie")]
        public IActionResult GetById(int id)
        {
            var item = MovieItems.FindById(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
    }
}
