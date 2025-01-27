import transporter from "../config/nodemailerConfig";

const sendVerificationEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please verify your email address",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .otp {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
            text-align: center;
          }
          .footer {
            font-size: 14px;
            color: #777777;
            text-align: center;
            margin-top: 30px;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>One-Time Password (OTP)</h2>
            <p>We received a request for your verification. Please use the OTP below to complete your action.</p>
          </div>
          
          <div class="otp">
            <p>${otp}</p>
          </div>

          <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>For any assistance, contact support at <a href="mailto:support@example.com">vasaitout@gmail.com</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email verification:", error);
  }
};

export { sendVerificationEmail };
