const passwordEmailFormat = (newPassword) => {
  const formatMail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Password Information</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .email-header h1 {
            margin: 0;
            color: #333333;
        }
        .email-content {
            padding: 20px;
            color: #555555;
        }
        .email-content p {
            margin: 0 0 10px;
        }
        .new-password {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            background-color: #f9f9f9;
            padding: 10px;
            border: 1px solid #dddddd;
            border-radius: 4px;
            text-align: center;
            margin: 20px 0;
        }
        .email-footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            color: #888888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Password Reset Information</h1>
        </div>
        <div class="email-content">
            <p>Dear User,</p>
            <p>We have generated a new password for your account. Please use the following password to log in and ensure to change it after your first login to keep your account secure.</p>
            <div class="new-password">
                Password: ${newPassword}
            </div>
            <p>Thank you,</p>
            <p>SpaceZee</p>
        </div>
        <div class="email-footer">
            <p>If you did not request a password reset, please contact our support team immediately.</p>
        </div>
    </div>
</body>
</html>
`;
  return formatMail;
};
const passwordResetEmailFormat = (resetUILink) => {
  const formatMail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 20px;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .email-header h1 {
            margin: 0;
            color: #333333;
        }
        .email-content {
            padding: 20px;
            color: #555555;
        }
        .email-content p {
            margin: 0 0 10px;
        }
        .email-footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            color: #888888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="email-content">
            <p>Dear User,</p>
            <p>We received a request to reset the password for your account. Click the button below to reset your password:</p>
            <p style="text-align: center;">
                <a href="${resetUILink}" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0; text-align: center;">Reset Password</a>
            </p>
            <p>This link is valid for 10 minutes. If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
            <p>Thank you,</p>
            <p>SpaceZee</p>
        </div>
        <div class="email-footer">
            <p>If you have any questions, feel free to contact us at support@example.com.</p>
        </div>
    </div>
</body>
</html>`;
  return formatMail;
};

export const emailFormatter = {
  passwordEmailFormat,
  passwordResetEmailFormat,
};
