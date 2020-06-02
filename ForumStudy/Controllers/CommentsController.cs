using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;

namespace ForumStudy.Controllers
{
    public class CommentsController : ControllerBase
    {
        CommentsModel mb = new CommentsModel();

        [HttpGet]
        [Route("api/Comments/GetByIdPost/{id}")]
        public IEnumerable<Comments> GetByIdPost(int id)
        {
            return mb.GetByIdPost(id);
        }

        [HttpGet]
        [Route("api/Comments/Add/mess={mess}&idm={idm}&idp={idp}")]
        public int Add(string mess, int idm, int idp)
        {
            return mb.Add(mess, idm, idp);
        }
    }
}