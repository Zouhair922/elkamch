const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit1', (req, res) => {
  // Your existing form submission logic here

  // Redirect to a success page
  res.redirect('/success.html');
});

// Handle GET requests for success.html
app.get('/success.html', (req, res) => {
  // Respond with the success.html page
  res.sendFile(__dirname + '/success.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
