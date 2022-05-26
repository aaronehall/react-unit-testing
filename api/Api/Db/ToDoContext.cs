using Microsoft.EntityFrameworkCore;

namespace Api.Db
{
    public class ToDoContext : DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public string DbPath { get; }

        public ToDoContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = Path.Combine(path, "todo.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite($"Data Source={DbPath}");
        }

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
