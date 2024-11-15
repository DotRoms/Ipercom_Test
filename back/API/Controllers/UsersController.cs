using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonProjetAPI_CRUD.Models;
using MonProjetAPI.Models;
using MonProjetAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System.Text;
using BCrypt.Net;

namespace MonProjetAPI_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // initialisation de la variable pour accéder a la base de données
        private readonly ApplicationDbContext _context;

        // initialisation de la variable pour accéder a la configuration
        private readonly IConfiguration _configuration;

        // Contructeur de la classe UserController
        public UserController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Ajouter un nouvel utilisateur
        [HttpPost("signup")]
        [SwaggerOperation(
            Summary = "Create a new user",
            Description = "Create a new user in the database."
        )]
        public async Task<ActionResult<User>> CreateUser(SignupRequest user)
        {

            // Check if the email is valid
            if (!Validator.IsValidEmail(user.email))
            {
                return BadRequest(new { message = "L'email n'est pas valide" });
            }

            // Check if the user already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.email);
            if (existingUser != null)
            {
                return Conflict(new { message = "Cet email est déjà utilisé" });
            }

            // Check if the password is valid
            if (!Validator.IsValidPassword(user.password))
            {
                return BadRequest(new { message = "Le mot de passe doit contenir au moins 8 caractères [1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial]" });
            }

            // Check if the password and confirmPassword match
            if (user.password != user.confirmPassword)
            {
                return BadRequest(new { message = "Les mots de passe ne correspondent pas" });
            }

            var newUser = new User
            {
                Name = user.name,
                Email = user.email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Created("", new { newUser.Id, newUser.Name, newUser.Email });

        }

        // Authentificate a user
        [HttpPost("login")]
        [SwaggerOperation(
            Summary = "Authenticate a user",
            Description = "Authenticate a user in the database."
        )]
        public async Task<IActionResult> Login(LoginRequest loginUser)
        {

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginUser.email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.password, user.Password))
            {
                return Unauthorized(new { message = "L'email ou le mot de passe est incorrect." });
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            // Create the token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            // Get the key from appsettings.json
            var jwtKey = _configuration["Jwt:Key"];
            // Check if the key is empty or null
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT Key is not configured.");
            }

            // Convert the key to byte array
            var key = Encoding.UTF8.GetBytes(jwtKey);
            // Create the token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Name", user.Name), // name of user
                    new Claim("Email", user.Email), // email of user
                    new Claim("User_id", user.Id.ToString()) // id of user
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                // Sign the token with the key
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            // Create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
