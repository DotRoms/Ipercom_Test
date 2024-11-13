using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonProjetAPI.Models;
using MonProjetAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BCrypt.Net;

namespace MonProjetAPI.Controllers
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

        // Récupérer tous les utilisateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            // Utilisation de Entity Framework pour récupérer tous les utilisateurs
            // _context.Users fait référence à la collection des utilisateurs dans la base de données
            // ToListAsync() permet de récupérer cette collection sous forme de liste de manière asynchrone
            return await _context.Users.ToListAsync();
        }

        // Ajouter un nouvel utilisateur
        [HttpPost("signup")]
        public async Task<ActionResult<User>> CreateUser(SignupRequest user)
        {

            // Verification if the user already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            // if user exist return error message
            if (existingUser != null)
            {
                return Conflict(new { message = "Cet email est déjà utilisé" });
            }

            var newUser = new User
            {
                Name = user.Name,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = newUser.Id }, new { newUser.Id, newUser.Name, newUser.Email });
        }

        // Authentifier l'utilisateur
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginUser)
        {

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginUser.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password))
            {
                return Unauthorized(new { message = "L'email ou le mot de passe est incorrect." });
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT Key is not configured.");
            }
            var key = Encoding.UTF8.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Name", user.Name), // name of user
                    new Claim("Email", user.Email), // email of user
                    new Claim("User_id", user.Id.ToString()) // id of user
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
