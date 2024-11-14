using System.ComponentModel.DataAnnotations;

namespace MonProjetAPI_CRUD.Models
{
    public class CreateTask
    {
        [Required]
        public int userId { get; set; }

        [Required]
        public string title { get; set; }

    }

    public class GetUserTask
    {
        [Required]
        public int userId { get; set; }
    }

    public class UpdateTask
    {
        [Required]
        public int userId { get; set; }

        [Required]
        public int taskId { get; set; }

    }

}