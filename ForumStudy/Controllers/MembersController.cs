using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;

namespace ForumStudy.Controllers
{
    public class EmployeeController : Controller
    {
        MembersModel mb = new MembersModel();

        [HttpGet]
        [Route("api/Members/GetAll")]
        public IEnumerable<Members> Index()
        {
            return mb.GetAll();
        }

        [HttpGet]
        [Route("api/Members/GetByName/{n}")]
        public ObjectResult GetByName(string n)
        {
            return mb.GetByName(n);
        }

        [HttpGet]
        [Route("api/Members/GetById/{id}")]
        public ObjectResult GetById(int id)
        {
            return mb.GetById(id);
        }

        [HttpGet]
        [Route("api/Members/CheckLogin/tk={tk}&mk={mk}")]
        public ObjectResult CheckLogin(string tk, string mk)
        {
            return mb.CheckLogin(tk,mk);
        }

        [HttpGet]
        [Route("api/Members/Add/tk={tk}&mk={mk}&em={em}")]
        public int Create(string tk, string mk, string em)
        {
            Members objm = new Members();
            objm.Account = tk;
            objm.Password = mk;
            objm.Email = em;
            return mb.Add(objm);
        }

        [HttpGet]
        [Route("api/Members/UpdateType/id={id}&type={type}")]
        public int UpdateType(int id,int type)
        {
            return mb.UpdateType(id, type);
        }
    }
}
