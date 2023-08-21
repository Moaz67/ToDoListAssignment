﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.DTO;
using ToDoList.Entity;
using AutoMapper;
using System.Reflection.Metadata.Ecma335;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly Task1DBContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ToDoListController> _logger;
        public ToDoListController(Task1DBContext context,IMapper mapper, ILogger<ToDoListController> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
      
       

        [HttpGet]
        public async Task<ActionResult> GetTodoItems(int page = 1, int pageSize = 5)
        {
            var totalCount = await _context.Task.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var items = await _context.Task
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var taskDtos = _mapper.Map<List<Task1Dto>>(items);
            return Ok(new
            {
                items = taskDtos,
                totalPages,
                currentPage = page
            });
        }
        [HttpGet("search")]
        public  async Task<ActionResult> GetTaskbySearch(string text, int page = 1, int pageSize = 5)
            {
            //var query =await _context.Task
            //        .Where(task => task.TaskDescription.Contains(text)||task.Creator.Contains(text)||task.AssignedTo.Contains(text)).ToListAsync();
            //var items = await query
            //   .Skip((page - 1) * pageSize)
            //   .Take(pageSize)
            //   .ToListAsync();
            //return Ok(items);

            //var items = await _context.Task
            //        .Where(task => task.TaskDescription.Contains(text) || task.Creator.Contains(text) || task.AssignedTo.Contains(text))
            //   .Skip((page - 1) * pageSize)
            //   .Take(pageSize)
            //   .ToListAsync();
            //var totalCount = await items.CountAsync();
            //var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            //return Ok(new { items = items, page,totalPages });
            var query = _context.Task
    .Where(task => task.TaskDescription.Contains(text) || task.Creator.Contains(text) || task.AssignedTo.Contains(text));

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            return Ok(new { items, page, totalPages });

        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTaskById(int id)
        {
            var task = await _context.Task.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        [HttpPost]
        public async Task<ActionResult<Task1>> AddTodoItem(Task1 task)
        {
            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItems), new { id = task.TaskId }, task);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, Task1 task)
        {
            
            if (task.Status== Entity.TaskStatus.Completed) {
                 
                task.CompletedDate = DateTime.Now;
                task.IsCompleted = true;
            }
            else
            {
               task.Status = Entity.TaskStatus.Edited;
            }
          

            _context.Entry(task).State = EntityState.Modified;

            
                await _context.SaveChangesAsync();
            
           

            return NoContent();
        }
        [HttpDelete("{id}")]
public async Task<IActionResult> DeleteTodoItem(int id)
{
    var task = await _context.Task.FindAsync(id);
    if (task == null)
    {
        return NotFound();
    }

    _context.Task.Remove(task);
    await _context.SaveChangesAsync();

    return NoContent();
}
        

    }
}
