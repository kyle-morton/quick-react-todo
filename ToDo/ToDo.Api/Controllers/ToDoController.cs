using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Models;

namespace ToDo.Api.Controllers;

[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
[Route("[controller]")]
public class ToDoController : ControllerBase
{

    public static List<ToDoItem> _items;

    public ToDoController()
    {
        if (_items == null)
        {
            _items = new List<ToDoItem>
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

    [HttpGet(Name = "GetToDos")]
    [Route("Get")]
    public IActionResult Get()
    {
        return Ok(_items);
    }

    [HttpPost(Name = "CreateToDo")]
    [Route("Create")]
    public IActionResult Create(string title)
    {
        var newToDo = new ToDoItem
        {
            Id = (int)DateTime.Now.Ticks,
            Title = title
        };
        _items.Add(newToDo);

        return Ok(newToDo);
    }

    [HttpPost(Name = "CompleteToDo")]
    [Route("Complete")]
    public IActionResult Complete(int id)
    {
        var todo = _items.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }

        todo.IsComplete = true;

        return Ok();
    }

    [HttpPost(Name = "DeleteToDo")]
    [Route("Delete")]
    public IActionResult Delete(int id)
    {
        var todo = _items.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }

        _items = _items.Where(i => i.Id != id).ToList();

        return Ok();
    }

}

