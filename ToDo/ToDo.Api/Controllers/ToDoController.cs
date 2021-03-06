using Microsoft.AspNetCore.Mvc;
using ToDo.Api.Models;

namespace ToDo.Api.Controllers;

[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
[Route("[controller]")]
public class ToDoController : ControllerBase
{

    public static List<ToDoItem> _items;
    private Random _rand;

    public ToDoController()
    {
        _rand = new Random();
        if (_items == null)
        {
            _items = new List<ToDoItem>
            {
                new ToDoItem
                {
                    Id = _rand.Next(1, 25000),
                    Title = "Replace Lightbulb",
                    IsComplete = true
                },
                new ToDoItem
                {
                    Id = _rand.Next(1, 25000),
                    Title = "Buy Milk"
                }
            };
        }
    }

    [HttpGet(Name = "GetToDos")]
    [Route("")]
    public IActionResult Get()
    {
        return Ok(_items);
    }

    [HttpPost(Name = "CreateToDo")]
    [Route("Create")]
    public IActionResult Create(CreateViewModel viewModel)
    {
        var newToDo = viewModel.ToModel();
        _items.Add(newToDo);

        return Ok(newToDo);
    }

    [HttpPost(Name = "CompleteToDo")]
    [Route("Complete/{id:int}")]
    public IActionResult Complete(int id)
    {
        var todo = _items.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }

        todo.IsComplete = true;

        return Ok(new { success = true });
    }

    [HttpPost(Name = "DeleteToDo")]
    [Route("Delete/{id:int}")]
    public IActionResult Delete(int id)
    {
        var todo = _items.FirstOrDefault(t => t.Id == id);
        if (todo == null)
        {
            return NotFound();
        }

        _items = _items.Where(i => i.Id != id).ToList();

        return Ok(new { success = true });
    }

}

