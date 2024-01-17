const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// MongoDB connection details
const mongoURI = 'mongodb+srv://<zouhairelkamch7>:<7OwcANUDBSftxBsg>@cluster.mongodb.net/<database>';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Handle form submission
    app.post('/submit1', (req, res) => {
      const formData = req.body;

      // Insert form data into MongoDB
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


