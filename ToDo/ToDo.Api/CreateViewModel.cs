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
                Id = new Random().Next(1, 25000),
                Title = Title
            };
        }
    }
}

