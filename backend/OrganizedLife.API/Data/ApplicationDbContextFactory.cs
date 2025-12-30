using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace OrganizedLife.API.Data;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        
        // Connection string padrão para migrations (SQLite)
        optionsBuilder.UseSqlite("Data Source=organizedlife.db");

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
