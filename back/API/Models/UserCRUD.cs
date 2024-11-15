using System;
using System.ComponentModel.DataAnnotations;

namespace MonProjetAPI_CRUD.Models
{
    public class SignupRequest
    {
        [Required]
        [StringLength(50, ErrorMessage = "Le nom doit contenir au maximum 50 caractères")]
        public string name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "L'email n'est pas valide")]
        public string email { get; set; }

        [Required(ErrorMessage = "Veuillez entrer un mot de passe")]
        [MinLength(8, ErrorMessage = "Le mot de passe doit contenir au moins 8 caractères")]
        public string password { get; set; }

        [Required(ErrorMessage = "Veuillez confirmer votre mot de passe")]
        [Compare("password", ErrorMessage = "Les mots de passe ne correspondent pas")]
        public string confirmPassword { get; set; }

        public DateTime? createdAt { get; set; }

        
    }

      public class LoginRequest
    {
        [Required (ErrorMessage = "Veillez entrer votre email")]
        [EmailAddress]
        public string email { get; set; }

        [Required (ErrorMessage = "Veuillez entrer votre mot de passe")]
        public string password { get; set; }
    }
}
