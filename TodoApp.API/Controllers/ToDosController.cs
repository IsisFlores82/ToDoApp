using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers;
//API ENDPOINTS

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly AppDbContext _context;

    //bd instance
    public TodosController(AppDbContext context)
    {
        _context = context;
    }

    //return all tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        return await _context.Todos.ToListAsync();
    }

    //check / uncheck 
    [HttpPatch("{id}/toggle")]
    public async Task<IActionResult> ToggleTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo == null)
            return NotFound();

        todo.IsCompleted = !todo.IsCompleted;

        await _context.SaveChangesAsync();

        return Ok(todo);
    }

    //return just one with id
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo == null)
            return NotFound();

        return todo;
    }

    //create a task
    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
    {
        todo.CreatedAt = DateTime.UtcNow;

        _context.Todos.Add(todo);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTodo),
            new { id = todo.Id },
            todo
        );
    }

    //update a task
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(
        int id,
        TodoItem updatedTodo)
    {
        if (id != updatedTodo.Id)
            return BadRequest();

        _context.Entry(updatedTodo).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    //delete a task
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);

        if (todo == null)
            return NotFound();

        _context.Todos.Remove(todo);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}