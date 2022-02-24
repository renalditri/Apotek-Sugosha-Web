const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  path = require('path'),
  publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

// app.get('/', function (req, res) {
//   res.sendFile(publicPath);
// });

app.get('/*', function(req, res) {
  res.sendFile(publicPath, function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log('running server on port ' + port)
})