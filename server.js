const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/success.html', (req, res) => {
  // Extract form data
  const formData = req.body;

  // Configure nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ' z4943562@gmail.com',
      pass: ' 0034697864304Zouhair',
    },
  });

  // Compose email
  const mailOptions = {
    from: ' z4943562@gmail.com',
    to: ' z4943562@gmail.com',
    subject: 'New Form Submission',
    text: JSON.stringify(formData),
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });

  // Redirect to a success page
  res.redirect('/success.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
