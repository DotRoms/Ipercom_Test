using System;
using System.ComponentModel.DataAnnotations;

namespace MonProjetAPI_CRUD.Models
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}