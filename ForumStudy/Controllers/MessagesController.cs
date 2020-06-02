using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ForumStudy.Models;

namespace ForumStudy.Controllers
{
    public class MessagesController : ControllerBase
    {
        MessagesModel mb = new MessagesModel();

        [HttpGet]
        [Route("api/Messages/GetByReceiver/{id}")]
        public IEnumerable<Messages> GetByReceiver(int id)
        {
            return mb.GetByReceiver(id);
        }
    }
}