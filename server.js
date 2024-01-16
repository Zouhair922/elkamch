const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// MongoDB Atlas connection
const atlasUsername = 'zouhairelkamch7';
const atlasPassword = '<7OwcANUDBSftxBsg>';
const atlasCluster = 'website.eblsfqa.mongodb.net';
const atlasDatabase = 'zouhair_commerce';

mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasCluster}/${atlasDatabase}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  quantity: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

const formPages = ['/formproduct1.html', '/formproduct2.html', /* ... add other form pages ... */];

formPages.forEach((page) => {
  app.get(page, (req, res) => {
    res.sendFile(__dirname + page);
  });

  const submitRoute = `/submit${formPages.indexOf(page) + 1}`;

  app.post(submitRoute, async (req, res) => {
    try {
      const { name, address, phone, email, quantity } = req.body;
      const parsedQuantity = parseInt(quantity, 10);
      console.log('Received form data:', { name, address, phone, email, parsedQuantity });

      const newOrder = new Order({
        name,
        address,
        phone,
        email,
        quantity: parsedQuantity,
      });

      await newOrder.save();
      // Redirect to the success page hosted on Vercel
      res.redirect('https://elkamch.vercel.app/success.html');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/Contact.html', (req, res) => {
  res.sendFile(__dirname + '/Contact.html');
});

app.post('/submitContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Received contact form data:', { name, email, message });

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    // Redirect to the success page hosted on Vercel
    res.redirect('https://elkamch.vercel.app/success.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
