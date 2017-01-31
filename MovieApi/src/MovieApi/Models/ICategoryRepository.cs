using System.Collections.Generic;

namespace MovieApi.Models
{
    public interface ICategoryRepository
    {
        IEnumerable<CategoryItem> GetAll();
        CategoryItem FindById(string id);
    }
}
