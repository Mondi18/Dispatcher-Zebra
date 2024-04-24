using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using ZebraApi.DbContext;


namespace ZebraApi.Factory
{
    public class TaxiContextFactory
    {
        public class SightSeeingContextFactory : IDesignTimeDbContextFactory<TaxiDbContext>
        {
            public TaxiDbContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<TaxiDbContext>();
                optionsBuilder.UseSqlServer("Server=tcp:zebrataxidispathcer.database.windows.net,1433;Initial Catalog=zebrataxi;Persist Security Info=False;User ID=admin1;Password=Mondika1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                return new TaxiDbContext(optionsBuilder.Options);
            }

        }
    }
}

