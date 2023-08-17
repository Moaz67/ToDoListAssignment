using System.ComponentModel.DataAnnotations;

namespace ToDoList.Entity
{
    public class Task1
    {
       
            [Key]
            public int TaskId { get; set; }
            public string TaskDescription { get; set; }
            public DateTime CreatedDate { get; set; } = DateTime.Now;
            public bool IsCompleted { get; set; }
            public DateTime? CompletedDate { get; set; }
            public DateTime? DueDate { get; set; }
            public string AssignedTo { get; set; }
            public string Creator { get; set; }
        public TaskStatus Status { get; set; }

        
    }
}
