namespace Articles.Services.StorageServices
{
    public interface IStorageService
    {
        /// <summary>
        /// Lấy đường dẫn tới fileName
        /// </summary>
        string GetFileUrl(string fileName);
        /// <summary>
        /// Xử lý lưu file
        /// </summary>
        Task SaveFileAsync(Stream mediaBinaryStream, string fileName);
        /// <summary>
        /// Xử lý xóa file
        /// </summary>
        Task DeleteFileAsync(string fileName);
    }
}