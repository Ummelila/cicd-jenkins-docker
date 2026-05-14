const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path: '/var/lib/jenkins/workspace/cicd/three-tier-app/backend/.env'});

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

app.get('/admin', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    let html = `
      <html>
      <head>
        <title>Admin Panel</title>
        <style>
          body { font-family: Arial; margin: 40px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
          th { background: #4f8ef7; color: white; }
          tr:nth-child(even) { background: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Registered Users</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Field of Interest</th>
          </tr>
    `;
    results.forEach(user => {
      html += `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.interest}</td>
        </tr>
      `;
    });
    html += `</table></body></html>`;
    res.send(html);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));