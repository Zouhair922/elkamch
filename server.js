const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // Set your desired port

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB Atlas connection details
const atlasUsername = 'zouhairelkamch7';
const atlasPassword = '<7OwcANUDBSftxBsg>';
const atlasCluster = 'website.eblsfqa.mongodb.net';
const atlasDatabase = 'website';
const collectionName = 'data';

const connectionString = `mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasCluster}/${atlasDatabase}?retryWrites=true&w=majority`;

// POST endpoint to handle form submissions
app.post('/submit1', async (req, res) => {
  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(atlasDatabase);
    const collection = db.collection(collectionName);

    const formData = req.body;

    // Insert form data into MongoDB
    const result = await collection.insertOne(formData);

    console.log('Form data inserted:', result.ops);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
