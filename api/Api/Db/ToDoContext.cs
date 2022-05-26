using Microsoft.EntityFrameworkCore;

namespace Api.Db
{
    public class ToDoContext : DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoItem>().HasData(new List<ToDoItem>
            {
                new()
                {
                    Id = 1,
                    Description = "Pick up groceries"
                },
                new()
                {
                    Id = 2,
                    Description = "Go to bank"
                },
                new()
                {
                    Id = 3,
                    Description = "Go to post office"
                }
            });
        }
    }
}
