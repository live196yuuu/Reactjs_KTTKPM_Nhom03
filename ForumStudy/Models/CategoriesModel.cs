using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class CategoriesModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Categories> GetAll()
        {
            try
            {
                return db.Categories.ToList();
            }
            catch
            {
                throw;
            }
        }
        public Categories GetById(int id)
        {
            try
            {
                return db.Categories.Find(id);
            }
            catch
            {
                throw;
            }
        }
    }
}
