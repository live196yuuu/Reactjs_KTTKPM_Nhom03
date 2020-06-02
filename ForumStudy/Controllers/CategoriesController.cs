using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;

namespace ForumStudy.Controllers
{
    public class CategoriesController : ControllerBase
    {
        CategoriesModel mb = new CategoriesModel();

        [HttpGet]
        [Route("api/Categories/GetAll")]
        public IEnumerable<Categories> Index()
        {
            return mb.GetAll();
        }

        [HttpGet]
        [Route("api/Categories/GetById/{id}")]
        public Categories GetById(int id)
        {
            return mb.GetById(id);
        }
    }
}