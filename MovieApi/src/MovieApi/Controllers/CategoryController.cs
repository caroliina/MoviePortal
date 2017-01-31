using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MovieApi.Models;

namespace MovieApi.Controllers
{
    [Route("api/categories")]
    public class CategoryController : Controller
    {
        public CategoryController(ICategoryRepository categoryItems)
        {
            CategoryItems = categoryItems;
        }

        public ICategoryRepository CategoryItems { get; set; }

        [HttpGet]
        public IEnumerable<CategoryItem> GetAll()
        {
            return CategoryItems.GetAll();
        }

        [HttpGet("{id}", Name = "GetCategory")]
        public IActionResult GetById(string id)
        {
            var item = CategoryItems.FindById(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
    }
}
