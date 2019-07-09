const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', function (req, res) {
    console.log(req.body),
    res.send('Got a POST request');
  });

app.listen(3001, () => {
    console.log('listening on port 3001');
});