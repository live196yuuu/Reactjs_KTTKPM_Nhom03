using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;
using System.Data;

namespace ForumStudy.Controllers
{
    public class PostsController : ControllerBase
    {
        PostsModel mb = new PostsModel();

        [HttpGet]
        [Route("api/Posts/GetAll")]
        public IEnumerable<Posts> GetAll()
        {
            return mb.GetAll();
        }

        [HttpGet]
        [Route("api/Posts/GetByIdTopic/{id}")]
        public IEnumerable<Posts> GetByIdTopic(int id)
        {
            return mb.GetByIdTopic(id);
        }

        [HttpGet]
        [Route("api/Posts/GetById/{id}")]
        public Posts GetById(int id)
        {
            return mb.GetById(id);
        }

        [HttpGet]
        [Route("api/Posts/Add/tit={tit}&mess={mess}&idm={idm}&idt={idt}")]
        public int Add(string tit, string mess, int idm, int idt)
        {
            return mb.Add(tit,mess,idm,idt);
        }
    }
}