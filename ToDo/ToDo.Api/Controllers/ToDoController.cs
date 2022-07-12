using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Models;

namespace ToDo.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoController : ControllerBase
{
    public ToDoController()
    {
    }

    [HttpGet(Name = "GetToDos")]
    public IEnumerable<ToDoItem> Get()
    {
        return new List<ToDoItem>
        {
            new ToDoItem
            {
                Id = (int)DateTime.Now.Ticks,
                Title = "Replace Lightbulb",
                IsComplete = true
            },
            new ToDoItem
            {
                Id = (int)DateTime.Now.Ticks,
                Title = "Buy Milk"
            }
        };
    }
}

