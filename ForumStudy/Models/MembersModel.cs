using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class MembersModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Members> GetAll()
        {
            try
            {
                return db.Members.ToList();
            }
            catch
            {
                throw;
            }
        }
        public ObjectResult GetByName(string name)
        {
            try
            {
                var x = db.Members.Where(s => s.Account == name)
                    .Select(s => new { s.Id, s.Account, s.Email, s.Type });
                return new ObjectResult(x);
            }
            catch
            {
                throw;
            }
        }

        public ObjectResult GetById(int id)
        {
            try
            {
                var x = db.Members.Where(s => s.Id == id)
                    .Select(s => new { s.Id, s.Account, s.Email, s.Type });
                return new ObjectResult(x);
                //return db.Members.Find(id);
            }
            catch
            {
                throw;
            }
        }

        public ObjectResult CheckLogin(string tk, string mk)
        {
            try
            {
                var x = db.Members.Where(s => s.Account == tk && s.Password == mk)
                    .Select(s => new { s.Id, s.Account, s.Email, s.Type });
                return new ObjectResult(x);
            }
            catch
            {
                throw;
            }
        }

        public int Add(Members mb)
        {
            try
            {
                db.Members.Add(mb);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateType(int id, int type)
        {
            try
            {
                db.Database.ExecuteSqlCommand("update Members set type=" + type + " where id=" + id);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
