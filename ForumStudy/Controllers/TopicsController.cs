using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;

namespace ForumStudy.Controllers
{
    public class TopicsController : ControllerBase
    {
        TopicsModel mb = new TopicsModel();

        [HttpGet]
        [Route("api/Topics/GetByIdCategory/{id}")]
        public IEnumerable<Topics> GetByIdCategory(int id)
        {
            return mb.GetByIdCategory(id);
        }

        [HttpGet]
        [Route("api/Topics/GetById/{id}")]
        public Topics GetById(int id)
        {
            return mb.GetById(id);
        }
    }
}