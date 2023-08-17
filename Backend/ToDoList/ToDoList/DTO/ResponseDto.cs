using ToDoList.Entity;
using TaskStatus = ToDoList.Entity.TaskStatus;

namespace ToDoList.DTO
{
    public class ResponseDto
    {
        public Task1Dto TaskDto { get; set; }
        public TaskStatus Status { get; set; }
    }
}
