using Articles.Models;
using Articles.Models.Data.AggregateMails;
using Articles.Services.Mail;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Articles.Services.Mail
{
    public class SendMailService : ISendMailService
    {
        private readonly MailSettings _mailSettings;
        public SendMailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        public async Task<string> SendMailAsync(MailContent mailContent)
        {
            var email = new MimeMessage();

            //* sender
            email.Sender = new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail);
            email.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));

            //* receiver
            email.To.Add(new MailboxAddress(mailContent.To, mailContent.To));
            email.Subject = mailContent.Subject;

            //* content
            var builder = new BodyBuilder();
            builder.HtmlBody = mailContent.Body;
            email.Body = builder.ToMessageBody();

            //* connect host send mail
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);

                //* authentication
                await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);

                //* send mail
                await smtp.SendAsync(email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Resource.Resource.ERROR_CONNECT + e.Message;
            }

            //* finish disconnect
            smtp.Disconnect(true);
            return Resource.Resource.DISCONNECTED_SUCCESS;
        }
    }
}