namespace MonProjetAPI_CRUD.Models
{
    public class CreateTask
    {
        public int UserId { get; set; }
        public string Title { get; set; }

    }

    public class GetUserTask
    {
        public int UserId { get; set; }
    }
}