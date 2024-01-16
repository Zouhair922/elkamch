const mongoose = require('mongoose');

// Replace the existing connection string with the MongoDB Atlas connection string
const atlasUsername = 'zouhairelkamch7';
const atlasPassword = '<7OwcANUDBSftxBsg>';
const atlasCluster = 'website.eblsfqa.mongodb.net';
const atlasDatabase = 'zouhair_commerce';

mongoose.connect(`mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasCluster}/${atlasDatabase}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  quantity: Number,
  createdAt: { type: Date, default: Date.now }, // Add a timestamp for order creation
});

// Create an Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

// Define the schema for contact form submissions
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a Contact model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Use bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Define a route for serving different form pages
const formPages = ['/formproduct1.html', '/formproduct2.html', '/formproduct3.html', '/formproduct4.html', '/formproduct5.html', '/formproduct6.html', '/formproduct7.html', '/formproduct8.html', '/formproduct9.html', '/formproduct10.html', '/formproduct11.html', '/formproduct12.html', '/formproduct13.html', '/formproduct14.html', '/formproduct15.html', '/formproduct16.html', '/formproduct17.html', '/formproduct18.html', '/formproduct19.html', '/formproduct20.html', '/formproduct21.html', '/formproduct22.html', '/formproduct23.html', '/formproduct24.html', '/formproduct25.html', '/formproduct26.html', '/formproduct27.html', '/formproduct28.html', '/formproduct29.html', '/formproduct30.html', '/formproduct79.html', '/formproduct80.html', '/formproduct81.html', '/formproduct84.html', '/formproduct48.html'];

formPages.forEach((page) => {
  app.get(page, (req, res) => {
    res.sendFile(__dirname + page);
  });

  // Handle form submissions for each form page
const submitRoute = `/submit${formPages.indexOf(page) + 1}`;

  app.post(submitRoute, async (req, res) => {
    try {
      const { name, address, phone, email, quantity } = req.body;
      // Parse quantity as a number
      const parsedQuantity = parseInt(quantity, 10);
      console.log('Received form data:', { name, address, phone, email, parsedQuantity });

      // Create a new Order document
      const newOrder = new Order({
        name,
        address,
        phone,
        email,
        quantity: parsedQuantity,
      });

      // Save the order to the MongoDB database
      await newOrder.save();
// Redirect to the success page
res.sendFile(__dirname + '/views/success.html');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Define a route for serving Contact.html
app.get('/Contact.html', (req, res) => {
  res.sendFile(__dirname + '/Contact.html');
});

// Handle form submissions from Contact.html
app.post('/submitContact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Received contact form data:', { name, email, message });

    // Create a new Contact document
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact form submission to the MongoDB database
    await newContact.save();

    // Redirect to the success page
    res.sendFile(__dirname + '/views/success.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
