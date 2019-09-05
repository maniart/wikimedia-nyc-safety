'use strict';

/* imports */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

if (process.env.NODE_ENV === 'development') {
  console.log('-> Development environment. Using `.env` file.');
  require('dotenv').config();
} 

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
});

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static('public'))

app.post('/message', function (request, response) {
  console.log(request.body); 
  
  response.send(`
    <Response>
      <Message>
        Thank you for your report. The organizers have been notified, and they will take appropriate actions to ensure a safe experience for everyone.
      </Message>
    </Response>`
  );
  
  const { Body: report, From: reporterNumber } = request.body;
  
  const message = {
    from: 'anonymous-participant@wikimedia.org', 
    to: 'wikimedia.nyc.organizers@gmail.com',
    subject: 'Participant safety report',
    text: `
      Participant with phone number: ${reporterNumber} 
      Sent the following report: 
      ${report}
    `
  };

  transport.sendMail(message, function (error, info) {
    if (error) {
      console.log('Failed to send email: ', error);
    } else {
      console.log('Successfully sent email: ', info);
    }
  });

});

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Wikimedia NYC Satefy SMS Reporter is listening on: ' + listener.address().port);
});