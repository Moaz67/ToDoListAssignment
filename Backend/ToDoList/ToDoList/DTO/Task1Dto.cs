namespace ToDoList.DTO
{
    public class Task1Dto
    {
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
