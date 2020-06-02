using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumStudy.Models
{
    public class MessagesModel
    {
        ConnectDB db = new ConnectDB();
        public IEnumerable<Messages> GetByReceiver(int id)
        {
            try
            {
                return db.Messages.Where(x => x.Receiver == id);
            }
            catch
            {
                throw;
            }
        }
    }
}
