using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MovieApi.Models;

namespace MovieApi.Controllers
{
    [Route("api/movies")]
    public class MovieController : Controller
    {
        public MovieController(IMovieRepository movieItems)
        {
            MovieItems = movieItems;
        }

        public IMovieRepository MovieItems { get; set; }

        [HttpGet]
        public IEnumerable<MovieItem> GetAll()
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
