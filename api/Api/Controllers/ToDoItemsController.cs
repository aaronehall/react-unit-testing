using Api.Db;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoItemsController : ControllerBase
    {
        private readonly ToDoContext _db;

        public ToDoItemsController(ToDoContext db) => _db = db;

        [HttpGet]
        public IActionResult Get() => Ok(_db.ToDoItems.ToList());

        [HttpPost]
        public IActionResult Post(ToDoItemCreateModel apiModel)
        {
            ToDoItem dbModel = new()
            {
                Description = apiModel.Description
            };

            _db.ToDoItems.Add(dbModel);

            _db.SaveChanges();
            return Created($"{dbModel.Id}", apiModel);
        }
    }
}