using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace MovieApi.Models
{
    public class CategoryRepository : ICategoryRepository
    {
        private static ConcurrentDictionary<string, CategoryItem> _categories =
              new ConcurrentDictionary<string, CategoryItem>();

        public CategoryRepository()
        {
            Add(new CategoryItem { Id = "fiction", Name = "Fiction" });
            Add(new CategoryItem { Id = "fantasy", Name = "Fantasy" });
        }

        public IEnumerable<CategoryItem> GetAll()
        {
            return _categories.Values;
        }

        public CategoryItem FindById(string id)
        {
            CategoryItem item;
            _categories.TryGetValue(id, out item);
            return item;
        }

        public void Add(CategoryItem item)
        {
            _categories[item.Id] = item;
        }
    }
}
