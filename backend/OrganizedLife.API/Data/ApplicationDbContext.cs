using Microsoft.EntityFrameworkCore;
using OrganizedLife.API.Models.Entities;

namespace OrganizedLife.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        });

        // Transaction configuration
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Description).IsRequired().HasMaxLength(500);
            
            entity.HasOne(e => e.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Category configuration
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            
            entity.HasOne(e => e.User)
                .WithMany(u => u.Categories)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Seed default categories
        SeedCategories(modelBuilder);
    }

    private void SeedCategories(ModelBuilder modelBuilder)
    {
        // Default system categories (UserId will be null for system-wide categories)
        var seedDate = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        
        var categories = new[]
        {
            new Category { Id = 1, Name = "Salário", Icon = "💰", Color = "#10B981", Type = TransactionType.Income, CreatedAt = seedDate },
            new Category { Id = 2, Name = "Alimentação", Icon = "🍔", Color = "#EF4444", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 3, Name = "Transporte", Icon = "🚗", Color = "#F59E0B", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 4, Name = "Moradia", Icon = "🏠", Color = "#8B5CF6", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 5, Name = "Lazer", Icon = "🎮", Color = "#EC4899", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 6, Name = "Saúde", Icon = "⚕️", Color = "#06B6D4", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 7, Name = "Educação", Icon = "📚", Color = "#3B82F6", Type = TransactionType.Expense, CreatedAt = seedDate },
            new Category { Id = 8, Name = "Outros", Icon = "📦", Color = "#6B7280", Type = TransactionType.Expense, CreatedAt = seedDate }
        };

        modelBuilder.Entity<Category>().HasData(categories);
    }
}
