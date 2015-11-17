using System.Web.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using DmLaboratorij_1.Models;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Script.Serialization;

namespace DmLaboratorij_1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MovieInfoController : ApiController
    {
        [HttpGet]
        [Route("api/MovieInfo/{Themoviedb_id}")]
        [ResponseType(typeof(MovieModel))]
        public async Task<MovieModel> Get(string Themoviedb_id)
        {
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("SocialNetworks");
            string themoviedb_id = '"' + Themoviedb_id + '"';

            MovieModel movie = new MovieModel();
            var collection = mongoDbServer.GetCollection<BsonDocument>("MovieInfo");
            var filter = Builders<BsonDocument>.Filter.Eq("themoviedb_id", themoviedb_id);
            var result = await collection.Find(filter).ToListAsync();
            foreach (BsonDocument item in result)
            {
                movie.themoviedb_id = item.GetElement("themoviedb_id").Value.ToString();
                movie.original_title = item.GetElement("original_title").Value.ToString();
                movie.overview = item.GetElement("overview").Value.ToString();
                movie.release_date = item.GetElement("release_date").Value.ToString();
                movie.vote_average = item.GetElement("vote_average").Value.ToString();

            }
            var json = new JavaScriptSerializer().Serialize(movie);
            return movie;
        }

        // POST api/values
        [HttpPost]
        public void Post(MovieModel model)
        {
            var mongoDbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var mongoDbServer = mongoDbClient.GetDatabase("SocialNetworks");

            var document = new BsonDocument
            {
                { "themoviedb_id", '"' + model.themoviedb_id + '"' },
                { "original_title", '"' + model.original_title + '"' },
                { "overview", '"' + model.overview + '"' },
                { "release_date", '"' + model.release_date + '"' },
                { "vote_average", '"' + model.vote_average + '"' },
            };

            var collection = mongoDbServer.GetCollection<BsonDocument>("MovieInfo");
            collection.InsertOneAsync(document);

        }
    }
}
