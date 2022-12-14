
using Articles.Models.Data.AggregateArticles;
using Articles.Models.Data.DbContext;

namespace Articles.GenericRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Article> Articles { get; }
        Task Save();
    }
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _context;
        private IRepository<Article> _articles;

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;
        }
        public IRepository<Article> Articles => _articles ??= new Repository<Article>(_context);

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}