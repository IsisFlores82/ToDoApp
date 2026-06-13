namespace TodoApp.API.Models;

//class of each task
public class TodoItem
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Notes { get; set; } = "";

    public string Priority { get; set; } = "Medium";

    public bool IsCompleted { get; set; }

    public DateTime Deadline { get; set; }

    public DateTime CreatedAt { get; set; }
}