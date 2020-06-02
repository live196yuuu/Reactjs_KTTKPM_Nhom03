using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class Posts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public int IdMember { get; set; }
        public int IdTopic { get; set; }

    }
}
