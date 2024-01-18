const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection details
const mongoURI = 'mongodb+srv://<zouhairelkamch7>:<7OwcANUDBSftxBsg>@website.mongodb.net/<data>';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Handle form submission
    app.get('/success.html', (req, res) => {
      // Extract form data from query parameters
      const formData = {
        name: req.query.name,
        address: req.query.address,
        phone: req.query.phone,
        email: req.query.email,
        quantity: req.query.quantity
      };

      // Insert form data into MongoDB
      const db = client.db('<database>');
      const collection = db.collection('formData');

      collection.insertOne(formData)
        .then(result => {
          console.log('Form data inserted:', result.ops);
          res.sendFile(__dirname + '/success.html'); // Send success.html
        })
        .catch(error => {
          console.error('Error inserting form data:', error);
          res.status(500).send('Internal Server Error');
        });
    });
// Update the server-side code to handle the 'post' method
app.post('/submit1', (req, res) => {
  const formData = req.body;

  const db = client.db('<database>');
  const collection = db.collection('formData');

  collection.insertOne(formData)
    .then(result => {
      console.log('Form data inserted:', result.ops);
      res.json({ success: true });
    })
    .catch(error => {
      console.error('Error inserting form data:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
});

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



