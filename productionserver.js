
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/dist/bundle.js');
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico');
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
