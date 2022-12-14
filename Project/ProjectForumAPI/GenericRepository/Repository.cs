using System.Linq.Expressions;
using Articles.Models.Data.DbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
namespace Articles.GenericRepository
{
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// Lấy tất cả đối tượng
        /// </summary>
        Task<IList<T>> GetAllAsync(
            Expression<Func<T, bool>> expression = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
        );

        /// <summary>
        /// Lấy duy nhất một đối tượng cụ thể
        /// </summary>
        Task<T> GetAsync(
        Expression<Func<T, bool>> expression,
        Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
        );

        /// <summary>
        /// Thêm một đối tương
        /// </summary>
        Task InsertAsync(T entity);

        /// <summary>
        /// Xóa một đối tượng
        /// </summary>
        Task DeleteAsync(int id);

        /// <summary>
        /// Chỉnh sửa đối tươngk
        /// </summary>
        void Update(T entity);
    }
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DatabaseContext _context;
        private readonly DbSet<T> _dbSet;
        public Repository(DatabaseContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<IList<T>> GetAllAsync(
        Expression<Func<T, bool>> expression = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _dbSet;
            if (expression != null)
            {
                query = query.Where(expression);
            }
            if (include != null)
            {
                query = include(query);
            }
            if (orderBy != null)
            {
                query = orderBy(query);
            }
            return await query.AsNoTracking().ToListAsync();
        }
        public async Task<T> GetAsync(
        Expression<Func<T, bool>> expression,
        Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = _dbSet;
            if (include != null)
            {
                query = include(query);
            }
            return await query.AsNoTracking().FirstOrDefaultAsync(expression);
        }
        public async Task InsertAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }
        public async Task DeleteAsync(int id)
        {
            var delArticle = await _dbSet.FindAsync(id);
            _dbSet.Remove(delArticle);
        }
        public void Update(T entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}