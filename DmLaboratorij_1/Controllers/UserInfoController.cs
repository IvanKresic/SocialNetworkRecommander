using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace DmLaboratorij_1.Controllers
{
    public class UserInfoController : ApiController
    {

        [Authorize]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }







        /*
        private DM_DBEntities1 db = new DM_DBEntities1();

        [HttpPost]
        public List<userInfo> Test(int data)
        {
            //var dataSet = JsonConvert.DeserializeObject(data);
            //dataSet.ToString();
            //string[] allData = data.Split('#');
            //string userId = allData[0];
            //string token = allData[1];
            //userInfo userToken = db.userInfoes.Find(token);
            List<userInfo> myList = new List<userInfo>();
            //if(userToken != null)
            //{
            //    myList.Add(userToken);
            //}
            return myList;
        }

    }*/
    }
}
