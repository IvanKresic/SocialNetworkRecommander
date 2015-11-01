using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http;
using Newtonsoft.Json;
using DmLaboratorij_1.Models;
using System.Runtime.Serialization.Json;

namespace DmLaboratorij_1.Controllers
{
    public class UserInfoController : ApiController
    {
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

    }
}
