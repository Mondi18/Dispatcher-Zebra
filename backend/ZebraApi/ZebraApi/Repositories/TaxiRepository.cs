using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZebraApi.DbContext;
using ZebraApi.Interfaces;
using ZebraApi.Model;

namespace ZebraApi.Repositories
{
    public class TaxiRepository : ITaxiRepository
    {
        private readonly TaxiDbContext _taxiDbContext;

        public TaxiRepository(TaxiDbContext taxiDbContext)
        {
            _taxiDbContext = taxiDbContext;
        }

        public async Task<Taxi?> GetById(int id)
        {
            return await _taxiDbContext.Taxis.FindAsync(id);
        }

        public async Task<IEnumerable<Taxi>> GetAll()
        {
            return await _taxiDbContext.Taxis.ToListAsync();
        }

        public async Task<bool> Update(Taxi updatedTaxi)
        {
            var existingTaxi = await _taxiDbContext.Taxis.FirstOrDefaultAsync(t => t.Id == updatedTaxi.Id);
            if (existingTaxi != null)
            {
                existingTaxi.Lat = updatedTaxi.Lat;
                existingTaxi.Long = updatedTaxi.Long;

                await _taxiDbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}