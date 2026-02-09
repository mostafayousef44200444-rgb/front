const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// مسار build
const distPath = path.join(__dirname, 'dist/frontend/browser');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
