using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class TopicsModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Topics> GetByIdCategory(int id)
        {
            try
            {
                return db.Topics.Where(x => x.IdCategory == id);
            }
            catch
            {
                throw;
            }
        }
        public Topics GetById(int id)
        {
            try
            {
                return db.Topics.Find(id);
            }
            catch
            {
                throw;
            }
        }

        
    }
}
