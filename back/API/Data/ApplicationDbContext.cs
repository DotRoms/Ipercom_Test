using Microsoft.EntityFrameworkCore;
using MonProjetAPI.Models;

namespace MonProjetAPI.Data
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

         modelBuilder.Entity<UserTask>()
    .HasIndex(item => new { item.Title, item.UserId })
    .IsUnique();
        }
    }
}