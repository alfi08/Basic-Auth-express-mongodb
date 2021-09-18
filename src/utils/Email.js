const nodemailer = require('nodemailer');

class Email {
  constructor(user){
    this.to = user.email;
    this.from = `Alfi Sahri`;
    this.firstName = user.name.split(' ')[0];
  }

  transporter() {
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  async sendWelcome() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: 'Hello There',
      text: 'Welcome to our App, General Kenoby!',
    };
    
    await this.transporter().sendMail(mailOptions);
  }
}

module.exports = Email;