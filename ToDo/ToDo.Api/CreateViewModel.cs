using System;
using ToDo.Api.Models;

namespace ToDo.Api
{
    public class CreateViewModel
    {
        public string Title { get; set; }

        public ToDoItem ToModel()
        {
            return new ToDoItem
            {
                Id = (int)DateTime.Now.Ticks,
                Title = Title
            };
        }
    }
}

