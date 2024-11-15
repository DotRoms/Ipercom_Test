using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonProjetAPI_CRUD.Models;
using MonProjetAPI.Models;
using MonProjetAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BCrypt.Net;

namespace MonProjetAPI_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        // initialisation de la variable pour accéder a la base de données
        private readonly ApplicationDbContext _context;

        // initialisation de la variable pour accéder a la configuration
        private readonly IConfiguration _configuration;

        // Contructeur de la classe UserController
        public TasksController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Get all tasks for a user",
            Description = "Retrieve all tasks for a specific user. Requires the user ID as a query parameter. "
        )]
        public async Task<ActionResult<IEnumerable<UserTask>>> GetUserTasks([FromQuery] int userId)
        {
            try
            {
                // Utilisateur existe ?
                var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
                if (!userExists)
                {
                    return NotFound(new { message = "Utilisateur non trouvé." });
                }

                var userTasks = await _context.UserTasks
                    .Where(t => t.UserId == userId)
                    .ToListAsync();

                return Ok(userTasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur est survenue lors de la récupération des tâches.", details = ex.Message });
            }
        }


        [HttpPost("add")]
        [SwaggerOperation(
            Summary = "Add a new task for a user",
            Description = "Add a new task for a specific user. Requires the user ID and the task title as parameters."
        )]
        public async Task<ActionResult<UserTask>> AddTask(CreateTask task)
        {
            if (task == null)
            {
                return BadRequest(new { message = "Les données de la tâche sont manquantes." });
            }

            try
            {
                // Vérifier si l'utilisateur possède déjà une tâche avec le même titre
                var existingTask = await _context.UserTasks
                    .FirstOrDefaultAsync(t => t.UserId == task.userId && t.Title == task.title);

                // Si une tâche avec le même titre existe déjà pour cet utilisateur
                if (existingTask != null)
                {
                    return Conflict(new { message = "Vous avez déjà une tâche avec ce titre." });
                }

                // Créer une nouvelle tâche
                var newTask = new UserTask
                {
                    Title = task.title,
                    UserId = task.userId,
                    Completed = false,
                    CreatedAt = DateTime.UtcNow
                };

                // Ajouter la nouvelle tâche à la base de données
                _context.UserTasks.Add(newTask);
                await _context.SaveChangesAsync();

                // Retourner l'objet de la nouvelle tâche après l'ajout
                return CreatedAtAction("GetUserTasks", new { id = newTask.Id }, newTask);
            }
            catch (Exception ex)
            {
                // Gestion des erreurs, comme une erreur de base de données ou autre
                return StatusCode(500, new { message = "Une erreur est survenue lors de l'ajout de la tâche.", details = ex.Message });
            }
        }

        [HttpDelete("delete")]
        [SwaggerOperation(
            Summary = "Delete a task for a user",
            Description = "Update the status of a task. Requires the task ID and the new status as parameters."
        )]
        public async Task<ActionResult> DeleteTask([FromQuery] int userId, [FromQuery] int taskId)
        {

            if (userId == 0 || taskId == 0)
            {
                return BadRequest(new { message = "Les données de l'utilisateur ou de la tâche sont manquantes." });
            }

            try
            {
                // Chercher la tâche à supprimer avec les paramètres userId et taskId
                var existingTask = await _context.UserTasks
                    .FirstOrDefaultAsync(t => t.UserId == userId && t.Id == taskId);

                // Si la tâche n'est pas trouvée
                if (existingTask == null)
                {
                    return NotFound(new { message = "Tâche non trouvée." });
                }

                // Supprimer la tâche trouvée
                _context.UserTasks.Remove(existingTask);
                await _context.SaveChangesAsync();

                // Retourner un message de succès
                return Ok(new { message = "Tâche supprimée avec succès." });
            }
            catch (Exception ex)
            {
                // Retourner une erreur en cas d'exception
                return StatusCode(500, new { message = "Une erreur est survenue lors de la suppression de la tâche.", details = ex.Message });
            }
        }

        [HttpPut("update")]
        [SwaggerOperation(
            Summary = "Update the status of a task",
            Description = "Update the status of a task. Requires the task ID and the new status as parameters."
        )]
        public async Task<ActionResult> UpdateTask(UpdateTask task)

        {
            if (task == null)
            {
                return BadRequest(new { message = "Les données de la tâche sont manquantes." });
            }


            try
            {
                var existingTask = await _context.UserTasks.FirstOrDefaultAsync(t => t.UserId == task.userId && t.Id == task.taskId);
                if (existingTask == null)
                {
                    return NotFound(new { message = "Tâche non trouvée." });
                }

                existingTask.Completed = !existingTask.Completed;

                _context.Entry(existingTask).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(new { id = existingTask.Id, title = existingTask.Title, completed = existingTask.Completed });
            }
            catch (Exception ex)
            {
                // Retourner une erreur en cas d'exception
                return StatusCode(500, new { message = "Une erreur est survenue lors de la mise à jour de la tâche.", details = ex.Message });
            }
        }

    }

}
