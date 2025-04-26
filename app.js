const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set EJS
app.set('view engine', 'ejs');

// Static folder
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Storage setting for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Example: 123456.png
  }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.render('index', { image: null });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.send('Please upload a file');
  }
  res.render('index', { image: req.file.filename });
});

// Start Server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});