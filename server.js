const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

const DATA_FILE = '/tmp/roadmap.json';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'product-roadmap.html'));
});

app.get('/api/data', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } else {
    res.json(null);
  }
});

app.post('/api/data', (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body));
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
