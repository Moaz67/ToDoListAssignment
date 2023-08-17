using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ToDoList.Entity
{
    public class Task1DBContext:DbContext
    {
        
        
            public Task1DBContext(DbContextOptions options) : base(options)
            {
            }
            public DbSet<Task1> Task { get; set; }
        
    }
}
