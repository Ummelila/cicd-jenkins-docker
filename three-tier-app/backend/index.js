const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'formdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/register', (req, res) => {
  const { name, email, interest } = req.body;
  db.query(
    'INSERT INTO users (name, email, interest) VALUES (?, ?, ?)',
    [name, email, interest],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Registered successfully!' });
    }
  );
});

app.listen(5000, () => console.log('Server running on port 5000'));