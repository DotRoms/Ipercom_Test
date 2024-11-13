using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonProjetAPI_CRUD.Models;
using MonProjetAPI.Models;
using MonProjetAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BCrypt.Net;

namespace MonProjetAPI_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        // initialisation de la variable pour accéder a la base de données
        private readonly ApplicationDbContext _context;

        // initialisation de la variable pour accéder a la configuration
        private readonly IConfiguration _configuration;

        // Contructeur de la classe UserController
        public TaskController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
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
                    .FirstOrDefaultAsync(t => t.UserId == task.UserId && t.Title == task.Title);

                // Si une tâche avec le même titre existe déjà pour cet utilisateur
                if (existingTask != null)
                {
                    return Conflict(new { message = "Vous avez déjà une tâche avec ce titre." });
                }

                // Créer une nouvelle tâche
                var newTask = new UserTask
                {
                    Title = task.Title,
                    UserId = task.UserId,
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
    }
}
