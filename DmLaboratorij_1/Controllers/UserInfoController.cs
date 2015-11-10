using System.Collections.Generic;
using System.Web.Http;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using DmLaboratorij_1.Models;

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
        [HttpPost]  
        public void Post(UserModel model)
        {
            
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("SocialNetworks");

            var document = new BsonDocument
            {
                { "Facebook_ID", '"' + model.Facebook_ID + '"' },
                { "Ime", '"' + model.Ime + '"' },
                { "Prezime", '"' + model.Prezime + '"' },
                { "Email", '"' + model.Email + '"' },
                { "DatumRodjenja", '"' + model.DatumRodjenja + '"' },
                { "JSON_Objekt", '"' + model.JSON_Objekt + '"' }
            };

            var collection = mongoDbServer.GetCollection<BsonDocument>("UserInfo");
            collection.InsertOneAsync(document);
            
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

    }
}
