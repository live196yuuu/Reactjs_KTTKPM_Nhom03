using FastMember;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class PostsModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Posts> GetAll()
        {
            try
            {
                var data = db.Posts.ToList().OrderByDescending(x => x.Id);
                //DataTable table = new DataTable();
                //using (var reader = ObjectReader.Create(data))
                //{
                //    table.Load(reader);
                //}
                return data;
                //return db.Posts.ToList().OrderByDescending(x => x.Id);
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<Posts> GetByIdTopic(int id)
        {
            try
            {
                return db.Posts.Where(x => x.IdTopic == id).OrderByDescending(x => x.Id);
            }
            catch
            {
                throw;
            }
        }
        public Posts GetById(int id)
        {
            try
            {
                return db.Posts.Find(id);
            }
            catch
            {
                throw;
            }
        }

        public int Add(string tit, string mess, int idm, int idt)
        {
            try
            {
                db.Database.ExecuteSqlCommand("insert into Posts(title,message,idMember,idTopic) values(N'" + tit + "',N'"+mess+"','" + idm + "','" + idt + "')");
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
