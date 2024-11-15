using System;
using System.ComponentModel.DataAnnotations;

// Define the User model
namespace MonProjetAPI.Models
{
  public class User
  {
    public int Id { get; set; }

    public string Name { get; set; }
   
    public string Email { get; set; }

    public string Password { get; set; }

    public DateTime CreatedAt { get; set; }


    public DateTime? UpdatedAt { get; set; }
  }
}
