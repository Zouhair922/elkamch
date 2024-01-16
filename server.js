// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Atlas connection details
const atlasUsername = 'zouhairelkamch7';
const atlasPassword = '<7OwcANUDBSftxBsg>';
const atlasCluster = 'website.eblsfqa.mongodb.net';
const atlasDatabase = 'zouhair_commerce';

mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasCluster}/${atlasDatabase}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a Mongoose schema for your form data
const formDataSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  quantity: Number
});

const FormData = mongoose.model('FormData', formDataSchema);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '')));

// Handle form submission
app.post('/submit1', (req, res) => {
  const formData = new FormData({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    quantity: req.body.quantity
  });

  formData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/success.html'); // Redirect to a success page
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
