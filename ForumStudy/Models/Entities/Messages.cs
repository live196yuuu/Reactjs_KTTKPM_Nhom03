using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class Messages
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int Sender { get; set; }
        public int Receiver { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }

    }
}
