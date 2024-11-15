using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using MonProjetAPI_CRUD.Controllers;
using MonProjetAPI.Models;
using MonProjetAPI.Data;
using MonProjetAPI_CRUD.Models;

public class TasksControllerTests
{
    private readonly TasksController _controller; // Controller to test
    private readonly ApplicationDbContext _context; // In-memory database

    public TasksControllerTests()
    {
        // Setup DbContext with fresh options before each test
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())  // Use a fresh in-memory database for each test
            .Options; // Build the options
        _context = new ApplicationDbContext(options); // Create a new instance of the database context

        // add a user and a task to the in-memory database
        _context.Users.Add(new User { Id = 1, Name = "User1", Email = "test.test@gmail.com", Password = "test1234@" });
        _context.UserTasks.Add(new UserTask { Id = 1, Title = "Task 1", UserId = 1, Completed = false, CreatedAt = DateTime.UtcNow });
        _context.SaveChanges();  // Save changes to the in-memory database

        _controller = new TasksController(_context, Mock.Of<IConfiguration>()); // Create a new instance of the controller with a mock configuration
    }


    [Fact]
    public async Task GetUserTasks_ReturnsTasksAndOkResult_WhenUserExists()
    {
        // Act
        var result = await _controller.GetUserTasks(1); // Get tasks of the user with Id 1

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<UserTask>>>(result); // Verify if the result is of type HTTP response and contains a list of UserTask
        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result); // Verify if the result is an OK response
        var tasks = Assert.IsAssignableFrom<List<UserTask>>(okResult.Value); // Verify if the result contains a list of UserTask
        tasks.Count.Should().BeGreaterThan(0); // Verify if the list of tasks is not empty
    }

    [Fact]
    public async Task GetUserTasks_ReturnsNotFoundMessage_WhenUserDoesNotExist()
    {
        // Act
        var result = await _controller.GetUserTasks(99); // Try to get tasks of a user that does not exist

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<UserTask>>>(result); // Verify if the result of the action is an HTTP response and contains a list of UserTask
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult.Result); // Verify if the result is a NotFound response
        notFoundResult.Value.Should().BeEquivalentTo(new { message = "Utilisateur non trouvé." }); // Verify if the response contains the Notfound message
    }

    [Fact]
    public async Task AddTask_ReturnsTaskAndOkResult_WhenUserExists()
    {
        // Arrange
        var newTask = new CreateTask { title = "Task 2", userId = 1 }; // Create new task 

        // Act
        var result = await _controller.AddTask(newTask); // Add the new task to the temporary database

        // Assert
        var actionResult = Assert.IsType<ActionResult<UserTask>>(result); // Verify if the result is of type HTTP response and contains a UserTask
        var okResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result); // Verify if the result is a CreatedAtAction response
        var task = Assert.IsType<UserTask>(okResult.Value); // Verify if the result contains a UserTask
        task.Title.Should().Be(newTask.title); // Verify if the task title is the same as the new task title
    }

    [Fact]
    public async Task AddTask_ReturnsConflict_WhenTaskWithSameTitleExists()
    {
        // Arrange
        var newTask = new CreateTask { title = "Task 2", userId = 1 }; // Create new task
        await _controller.AddTask(newTask); // Add the new task to the temporary database

        // Act
        var result = await _controller.AddTask(newTask); // Try to add the same task again

        // Assert
        var actionResult = Assert.IsType<ActionResult<UserTask>>(result); // Verify if the result is of type HTTP response and contains a UserTask
        var conflictResult = Assert.IsType<ConflictObjectResult>(actionResult.Result); // Verify if the result is a Conflict response
        conflictResult.Value.Should().BeEquivalentTo(new { message = "Vous avez déjà une tâche avec ce titre." }); // Verify if the response contains the Conflict message
    }

    [Fact]
    public async Task DeleteTask_ReturnsBadRequest_WhenQueryIsNull()
    {
        // Act
        var result = await _controller.DeleteTask(0, 0); // Try to delete a task with a null query

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);  // Verify if the result is a BadRequest response
        badRequestResult.Value.Should().BeEquivalentTo(new { message = "Les données de l'utilisateur ou de la tâche sont manquantes."}); // Verify if the response contains the BadRequest message
    }

    
}
