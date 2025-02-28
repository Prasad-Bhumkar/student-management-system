const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { query } = require('../src/services/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Endpoints
app.get('/api/students', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  let queryStr = 'SELECT * FROM students';
  if (search) {
    queryStr += ` WHERE firstName LIKE '%${search}%' OR lastName LIKE '%${search}%' OR email LIKE '%${search}%' OR studentId LIKE '%${search}%'`;
  }
  queryStr += ` LIMIT ${(page - 1) * limit}, ${limit}`;

  try {
    const results = await query(queryStr);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const results = await query('SELECT * FROM students WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const studentData = req.body;
  try {
    const results = await query('INSERT INTO students SET ?', studentData);
    res.status(201).json({ id: results.insertId, ...studentData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const studentData = req.body;
  try {
    await query('UPDATE students SET ? WHERE id = ?', [studentData, id]);
    res.json({ id, ...studentData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM students WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
