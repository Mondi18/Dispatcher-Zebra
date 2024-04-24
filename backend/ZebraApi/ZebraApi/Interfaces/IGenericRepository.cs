using ZebraApi.Model;

namespace ZebraApi.Interfaces
{

    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetById(int id);
        Task<IEnumerable<T?>> GetAll();
        Task<bool> Update(Taxi taxi);
    }
}

