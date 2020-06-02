using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class CommentsModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Comments> GetByIdPost(int id)
        {
            try
            {
                return db.Comments.Where(x => x.IdPost == id);
            }
            catch
            {
                throw;
            }
        }
        public int Add(string mess, int idm, int idp)
        {
            try
            {
                db.Database.ExecuteSqlCommand("insert into Comments(message, idMember, idPost) values(N'"+mess+"','"+idm+"','"+idp+"')");
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
