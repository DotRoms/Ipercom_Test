using System;
using System.ComponentModel.DataAnnotations;

// Define the UserTask model
namespace MonProjetAPI.Models
{
    public class UserTask
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Le titre doit contenir au maximum 80 caractères")]
        public string Title { get; set; }

        [Required]
        public bool Completed { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
