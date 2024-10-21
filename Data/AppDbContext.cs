








using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedData(modelBuilder);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
        }

        private static void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Laptop",
                    Price = 1500,
                    Description = "A high-performance laptop for professionals.",
                    ImageUrl = "https://example.com/images/laptop.jpg"
                },
                new Product
                {
                    Id = 2,
                    Name = "Smartphone",
                    Price = 800,
                    Description = "A latest model smartphone with great features.",
                    ImageUrl = "https://example.com/images/smartphone.jpg"
                }
            );
        }
    }
}

