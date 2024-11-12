using System;
using System.ComponentModel.DataAnnotations;

// Define the User model
namespace MonProjetAPI.Models
{
    public class SignupRequest
    {
        [Required]
        [StringLength(50, ErrorMessage = "Le nom doit contenir au maximum 50 caractères")]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "L'email n'est pas valide")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Le mot de passe est obligatoire")]
        public string Password { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
