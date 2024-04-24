using Microsoft.EntityFrameworkCore;
using ZebraApi.Model;

namespace ZebraApi.DbContext
{
    public class TaxiDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Taxi> Taxis { get; set; }
        public TaxiDbContext(DbContextOptions<TaxiDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Taxi>()
                .HasIndex(t => t.Id)
                .IsUnique();
        }
    }
}