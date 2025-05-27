namespace Jsm33t.Shared.Helpers;

public static class Template
{
    public const string EmailVerificationHtml = """

                                                <!DOCTYPE html>
                                                <html>
                                                <head>
                                                    <meta charset='UTF-8'>
                                                    <title>Email Verification</title>
                                                    <style>
                                                        body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 0; }
                                                        .container { max-width: 520px; margin: 30px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 40px; }
                                                        .btn { display: inline-block; padding: 12px 28px; background: #1460F2; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 600; }
                                                        p { color: #333; font-size: 16px; }
                                                        .footer { margin-top: 32px; color: #888; font-size: 13px; }
                                                    </style>
                                                </head>
                                                <body>
                                                    <div class='container'>
                                                        <h2>Hello {FirstName},</h2>
                                                        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                                                        <p>
                                                            <a href='{Link}' class='btn'>Verify Email</a>
                                                        </p>
                                                        <p>If you did not create this account, please ignore this email.</p>
                                                        <div class='footer'>This email was sent by JSM33T.com</div>
                                                    </div>
                                                </body>
                                                </html>
                                                """;

    public const string PasswordResetHtml = """

                                            <!DOCTYPE html>
                                            <html>
                                            <head>
                                                <meta charset='UTF-8'>
                                                <title>Password Reset</title>
                                                <style>
                                                    body {
                                                        background-color: #f4f4f7;
                                                        font-family: 'Segoe UI', Arial, sans-serif;
                                                        margin: 0;
                                                        padding: 0;
                                                    }
                                                    .container {
                                                        max-width: 520px;
                                                        margin: 40px auto;
                                                        background: #fff;
                                                        border: 1.5px solid #1460F2;
                                                        border-radius: 0px;
                                                        box-shadow: 0 4px 24px rgba(20, 96, 242, 0.07);
                                                        padding: 40px 30px 32px 30px;
                                                    }
                                                    h2 {
                                                        color: #111827;
                                                        margin-top: 0;
                                                        font-weight: 700;
                                                    }
                                                    .btn {
                                                        display: inline-block;
                                                        padding: 12px 36px;
                                                        background: #1460F2;
                                                        color: #fff !important;
                                                        border-radius: 0px;
                                                        text-decoration: none;
                                                        font-weight: 600;
                                                        font-size: 16px;
                                                        margin: 24px 0;
                                                        letter-spacing: 0.5px;
                                                        border: 0;
                                                        box-shadow: 0 2px 8px rgba(20, 96, 242, 0.09);
                                                    }
                                                    p {
                                                        color: #24292f;
                                                        font-size: 16px;
                                                        margin-top: 0;
                                                        margin-bottom: 14px;
                                                        line-height: 1.6;
                                                    }
                                                    .footer {
                                                        margin-top: 30px;
                                                        color: #8b949e;
                                                        font-size: 13px;
                                                        border-top: 1px solid #eaeaea;
                                                        padding-top: 16px;
                                                        text-align: center;
                                                        letter-spacing: 0.02em;
                                                    }
                                                    .logo {
                                                        display: block;
                                                        margin: 0 auto 24px auto;
                                                        width: 62px;
                                                        height: 62px;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                <div class='container'>
                                                    <img src='https://jsm33t.com/favicon.ico' alt='JSM33T Logo' class='logo' />
                                                    <h2>Password Reset Request</h2>
                                                    <p>We received a request to reset your password. Click the button below to continue:</p>
                                                    <p>
                                                        <a href='{Link}' class='btn'>Reset Password</a>
                                                    </p>
                                                    <p style='font-size:14px;color:#737373;'>If you did not request this, simply ignore this email.</p>
                                                    <div class='footer'>
                                                        &copy; {DateTime.Now.Year} JSM33T.com &mdash; All rights reserved.
                                                    </div>
                                                </div>
                                            </body>
                                            </html>

                                            """;
}