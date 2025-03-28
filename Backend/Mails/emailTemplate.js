export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hack Of Clans</title>
</head>
<body style="background-color: #1a1a2e; color: #e0e0e0; font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #2a2a40; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(128, 0, 128, 0.5); color: white;">
        <h1 style="color: #bb86fc;">Hey! <span style="color: #c77dff;">User</span></h1>
        <h2 style="color: #bb86fc;">Welcome to <span style="color: #c77dff;">Hack Of Clans</span></h2>
        <p style="color: #e0e0e0;">Joining Hack of Clans would be a great thing!!<br>
        <strong>Build an inspiring portfolio</strong> and compete with peers</p>
        <p style="color: #e0e0e0;">This is the verification code that is sent to you:</p>
        <h2 style="color: rgb(169, 9, 175);">{verificationCode}</h2>
        <p style="color: white;"><strong>In case you did not sign up, please ignore this email.</strong></p>
         <p style="color: white;"><strong>Connect · Create · Compete</strong></p>
        <p style="margin-top: 20px; font-size: 14px; color: #a0a0a0;">For any queries, mail us at <a href="mailto:hackofclans.pbl@gmail.com" style="color: #bb86fc; text-decoration: none;">hackofclans.pbl@gmail.com</a></p>
    </div>
</body>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a2e;">
  <div style="background: linear-gradient(to right, rgb(90, 14, 196), rgb(112, 1, 61)); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="color: #333; font-size: 16px;">Hello,</p>
    <p style="color: #555;">We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background: linear-gradient(to right, rgb(162, 14, 178), rgb(196, 16, 112)); color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
        ✓
      </div>
    </div>
    <p style="color: #555;">If you did not initiate this password reset, please contact our support team immediately.</p>
    <p style="color: #555;">For security reasons, we recommend that you:</p>
    <ul style="color: #777; padding-left: 20px;">
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p style="color: #777; font-size: 14px;">Thank you for helping us keep your account secure.</p>
    <p style="color: #777; font-size: 14px;">Best regards,<br><strong>Hack Of Clans Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a2e;">
  <div style="background: linear-gradient(to right, rgb(66, 2, 71), rgb(147, 16, 228)); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🔒 Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="color: #333; font-size: 16px;">Hello,</p>
    <p style="color: #555;">We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p style="color: #555;">To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="display: inline-block; background: linear-gradient(to right, rgb(111, 3, 114), rgb(147, 16, 228)); color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);">Reset Password</a>
    </div>
    <p style="color: #777; font-size: 14px;">This link will expire in 1 hour for security reasons.</p>
    <p style="color: #777; font-size: 14px;">Best regards,<br><strong>Hack Of Clans Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hack Of Clans</title>
</head>
<body style="background-color: #1a1a2e; color: #e0e0e0; font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #2a2a40; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(128, 0, 128, 0.5);">
        <h1 style="color: #bb86fc;">Welcome, <span style="color: #c77dff;">{User Name}</span>!</h1>
        <h2 style="color: #bb86fc;">Welcome to <span style="color: #c77dff;">Hack Of Clans</span></h2>
        <p style="color: #e0e0e0;">Hack Of Clans is a <strong>hackathon team-building platform</strong> where people<br><strong>connect, create, and compete</strong></p>
        <p style="color: #e0e0e0;">We are thrilled to have you on board!</p>
        <p style="margin-top: 20px; font-size: 14px; color: #a0a0a0;">For any queries, mail us at <a href="mailto:hackofclans.pbl@gmail.com" style="color: #bb86fc; text-decoration: none;">hackofclans.pbl@gmail.com</a></p>
    </div>
</body>
</html>
`;