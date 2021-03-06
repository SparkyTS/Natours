const nodemailder = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailder.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PASSWORD,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email option
  const mailOptions = {
    from: `Tanay Shah <hello@tanay.io>`,
    to: options.email,
    subject: options.subject,
    text: options.message
    //html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;