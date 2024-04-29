// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');


const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("form\public"));

// Serve the HTML form
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.sendFile(path.join(__dirname, 'public', 'ind.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', async(req, res) => {
  try {
    const { name, email, message } = req.body;
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.send('Data saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving data.');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
