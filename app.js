const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: 'zakaryameddahi@gmail.com',
    to: email,
    subject: 'Subscription',
    text: 'This is a test email sent from a Node.js app.',
  };

  mailTransport.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        status: 'fail',
        message: 'Error Occurs!',
      });
    } else {
      console.log('Email sent successfully');
      res.json({
        status: 'success',
        message: 'Subscribed Successfully',
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
