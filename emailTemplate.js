const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #4CAF50;
              background: #e8f5e9;
              border: 1px dashed #4CAF50;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #007BFF;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Our Community!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
              <p>Here’s how you can get started:</p>
              <ul>
                  <li>Explore our features and customize your experience.</li>
                  <li>Stay informed by checking out our blog for the latest updates and tips.</li>
                  <li>Reach out to our support team if you have any questions or need assistance.</li>
              </ul>
              <a href="#" class="button">Get Started</a>
              <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
const Contact_User_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - Glowera</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f8;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(236,72,153,0.15);border:1px solid #fbcfe8;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ec4899,#f43f5e);padding:35px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:bold;letter-spacing:1px;">Glowera</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Beauty & Skincare Store</p>
        </div>

        <!-- Content -->
        <div style="padding:35px 30px;">
            <h2 style="margin:0 0 10px;color:#be185d;font-size:22px;">We received your message! 💌</h2>
            <p style="margin:0 0 20px;color:#6b7280;font-size:15px;line-height:1.7;">Hello <strong style="color:#374151;">{name}</strong>, thank you for reaching out to us. We have received your message and our team will get back to you within <strong>24-48 hours</strong>.</p>

            <!-- Message Box -->
            <div style="background:#fdf2f8;border-left:4px solid #ec4899;border-radius:8px;padding:20px;margin:25px 0;">
                <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Message</p>
                <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">{message}</p>
            </div>

            <!-- Details -->
            <div style="background:#f9fafb;border-radius:10px;padding:20px;margin:20px 0;">
                <p style="margin:0 0 12px;font-size:13px;color:#9ca3af;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Your Details</p>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;width:100px;">Name:</td><td style="padding:6px 0;color:#374151;font-size:14px;font-weight:600;">{name}</td></tr>
                    <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Email:</td><td style="padding:6px 0;color:#374151;font-size:14px;font-weight:600;">{email}</td></tr>
                    <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Phone:</td><td style="padding:6px 0;color:#374151;font-size:14px;font-weight:600;">{phone}</td></tr>
                </table>
            </div>

            <p style="margin:20px 0 0;color:#6b7280;font-size:14px;line-height:1.7;">Meanwhile, feel free to browse our latest collection at <a href="#" style="color:#ec4899;text-decoration:none;font-weight:bold;">Glowera Store</a>.</p>
        </div>

        <!-- Footer -->
        <div style="background:#fdf2f8;padding:20px 30px;text-align:center;border-top:1px solid #fbcfe8;">
            <p style="margin:0 0 5px;color:#ec4899;font-weight:bold;font-size:14px;">Glowera - Beauty & Skincare</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Glowera. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const Contact_Admin_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Glowera Admin</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f8;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(236,72,153,0.15);border:1px solid #fbcfe8;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#be185d,#9f1239);padding:35px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">New Contact Message</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Someone reached out via Glowera Contact Form</p>
        </div>

        <!-- Alert Badge -->
        <div style="background:#fef3c7;border:1px solid #fcd34d;margin:25px 30px 0;border-radius:10px;padding:14px 18px;display:flex;align-items:center;">
            <span style="font-size:20px;margin-right:10px;">🔔</span>
            <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">Action Required: A new message is waiting for your response.</p>
        </div>

        <!-- Sender Details -->
        <div style="padding:25px 30px 10px;">
            <h3 style="margin:0 0 15px;color:#be185d;font-size:16px;text-transform:uppercase;letter-spacing:1px;">Sender Information</h3>
            <div style="background:#f9fafb;border-radius:10px;padding:20px;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;">Full Name:</td><td style="padding:8px 0;color:#111827;font-size:14px;font-weight:700;">{name}</td></tr>
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Email:</td><td style="padding:8px 0;"><a href="mailto:{email}" style="color:#ec4899;font-size:14px;font-weight:600;text-decoration:none;">{email}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Phone:</td><td style="padding:8px 0;"><a href="tel:{phone}" style="color:#ec4899;font-size:14px;font-weight:600;text-decoration:none;">{phone}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Received:</td><td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{date}</td></tr>
                </table>
            </div>
        </div>

        <!-- Message -->
        <div style="padding:10px 30px 30px;">
            <h3 style="margin:0 0 15px;color:#be185d;font-size:16px;text-transform:uppercase;letter-spacing:1px;">Message</h3>
            <div style="background:#fdf2f8;border-left:4px solid #ec4899;border-radius:8px;padding:20px;">
                <p style="margin:0;color:#374151;font-size:15px;line-height:1.8;">{message}</p>
            </div>

            <!-- Reply Button -->
            <div style="text-align:center;margin-top:25px;">
                <a href="mailto:{email}?subject=Re: Your message to Glowera" style="display:inline-block;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#ffffff;padding:14px 35px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:15px;box-shadow:0 4px 15px rgba(236,72,153,0.4);">Reply to {firstName} ✉️</a>
            </div>
        </div>

        <!-- Footer -->
        <div style="background:#fdf2f8;padding:20px 30px;text-align:center;border-top:1px solid #fbcfe8;">
            <p style="margin:0 0 5px;color:#ec4899;font-weight:bold;font-size:14px;">Glowera Admin Panel</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">This is an automated notification. &copy; ${new Date().getFullYear()} Glowera.</p>
        </div>
    </div>
</body>
</html>
`;

const Newsletter_Admin_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscriber - Glowera Admin</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f8;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(236,72,153,0.15);border:1px solid #fbcfe8;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#be185d,#9f1239);padding:35px 30px;text-align:center;">
            <h1 style="margin:0 0 6px;color:#ffffff;font-size:26px;font-weight:bold;">New Newsletter Subscriber</h1>
            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:14px;">Someone just subscribed to Glowera Newsletter</p>
        </div>

        <!-- Alert Badge -->
        <div style="background:#fef3c7;border:1px solid #fcd34d;margin:25px 30px 0;border-radius:10px;padding:14px 18px;">
            <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">🔔 New subscriber added to your mailing list.</p>
        </div>

        <!-- Subscriber Info -->
        <div style="padding:25px 30px;">
            <h3 style="margin:0 0 15px;color:#be185d;font-size:15px;text-transform:uppercase;letter-spacing:1px;">Subscriber Details</h3>
            <div style="background:#f9fafb;border-radius:10px;padding:20px;">
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;">Email:</td><td style="padding:8px 0;"><a href="mailto:{email}" style="color:#ec4899;font-size:14px;font-weight:600;text-decoration:none;">{email}</a></td></tr>
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Subscribed:</td><td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{date}</td></tr>
                    <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Total Subs:</td><td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">{totalCount} subscribers</td></tr>
                </table>
            </div>
        </div>

        <!-- Footer -->
        <div style="background:#fdf2f8;padding:20px 30px;text-align:center;border-top:1px solid #fbcfe8;">
            <p style="margin:0 0 5px;color:#ec4899;font-weight:bold;font-size:14px;">Glowera Admin Panel</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">This is an automated notification. &copy; ${new Date().getFullYear()} Glowera.</p>
        </div>
    </div>
</body>
</html>
`;

const Newsletter_Subscription_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Glowera Newsletter</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f8;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(236,72,153,0.15);border:1px solid #fbcfe8;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#ec4899,#f43f5e);padding:40px 30px;text-align:center;">
            <h1 style="margin:0 0 6px;color:#ffffff;font-size:36px;font-weight:bold;letter-spacing:1px;">Glowera</h1>
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:14px;">Beauty & Skincare Store</p>
        </div>

        <!-- Hero Text -->
        <div style="padding:35px 30px 10px;text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">💌</div>
            <h2 style="margin:0 0 10px;color:#be185d;font-size:24px;font-weight:bold;">You're officially subscribed!</h2>
            <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">Thank you for joining the <strong style="color:#374151;">Glowera Newsletter</strong>. You'll be the first to know about our exclusive deals, new arrivals, and beauty tips.</p>
        </div>

        <!-- What to Expect -->
        <div style="padding:25px 30px;">
            <div style="background:#fdf2f8;border-radius:14px;padding:25px;">
                <p style="margin:0 0 16px;font-size:13px;color:#9ca3af;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">What you'll receive</p>
                <table style="width:100%;border-collapse:collapse;">
                    <tr>
                        <td style="padding:10px 0;vertical-align:top;width:36px;font-size:20px;">🛍️</td>
                        <td style="padding:10px 0;">
                            <p style="margin:0;color:#374151;font-size:14px;font-weight:700;">Exclusive Offers</p>
                            <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Special discounts only for our subscribers</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;vertical-align:top;font-size:20px;">✨</td>
                        <td style="padding:10px 0;">
                            <p style="margin:0;color:#374151;font-size:14px;font-weight:700;">New Arrivals</p>
                            <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Be the first to shop our latest products</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:10px 0;vertical-align:top;font-size:20px;">💄</td>
                        <td style="padding:10px 0;">
                            <p style="margin:0;color:#374151;font-size:14px;font-weight:700;">Beauty Tips & Tricks</p>
                            <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Expert skincare and beauty advice</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Subscribed Email -->
        <div style="padding:0 30px 25px;">
            <div style="background:#f9fafb;border:1px solid #fbcfe8;border-radius:10px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
                <span style="font-size:18px;">📧</span>
                <div>
                    <p style="margin:0;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Subscribed Email</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#374151;font-weight:700;">{email}</p>
                </div>
            </div>
        </div>

        <!-- CTA Button -->
        <div style="padding:0 30px 30px;text-align:center;">
            <a href="#" style="display:inline-block;background:linear-gradient(135deg,#ec4899,#f43f5e);color:#ffffff;padding:14px 40px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:15px;box-shadow:0 4px 15px rgba(236,72,153,0.35);">Shop Now 🛒</a>
        </div>

        <!-- Footer -->
        <div style="background:#fdf2f8;padding:20px 30px;text-align:center;border-top:1px solid #fbcfe8;">
            <p style="margin:0 0 5px;color:#ec4899;font-weight:bold;font-size:14px;">Glowera - Beauty & Skincare</p>
            <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Glowera. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = { Verification_Email_Template, Welcome_Email_Template, Contact_User_Template, Contact_Admin_Template, Newsletter_Subscription_Template, Newsletter_Admin_Template };
