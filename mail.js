const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'vasya@gmail.com',
    pass: 'vasya',
  }
});

smtpTransport.sendMail({
  from: 'Vasya Pupkin <vasya@gmail.com>',
  to: 'Petya Pupkin <petya@pupkin.ru>',
  subject: 'Hello, Petya',
  html: '<p>Hello, <b>Petya</b></p>',
  text: 'Hello, Petya!',
}, (err, respone) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Message has sent');
  }
  smtpTransport.close();
});