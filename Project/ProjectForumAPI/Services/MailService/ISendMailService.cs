using Articles.Models.Data.AggregateMails;

namespace Articles.Services.Mail
{
    public interface ISendMailService
    {
        Task<string> SendMailAsync(MailContent mailContent);
    }
}