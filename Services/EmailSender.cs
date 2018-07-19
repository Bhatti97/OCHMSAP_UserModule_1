using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCHMSAP_UserModule_1.Services
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress
                                    ("Email Confirmation",
                                     "noreplyohcmsap@gmail.com"
                                     ));
            mimeMessage.To.Add(new MailboxAddress
                                     (email,
                                     email
                                     ));
            mimeMessage.Subject = "Email Confirmation for OHCMSAP"; //Subject  
            mimeMessage.Body = new TextPart("html")
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate(
                    "noreplyohcmsap@gmail.com",
                    "Fifa123!"
                    );
                client.SendAsync(mimeMessage);
                client.DisconnectAsync(true);
            }
            return Task.CompletedTask;
        }
    }
}
