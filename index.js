const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', upload.none(), function (req, res) {
    console.log(req.body),
    res.send('Got a POST request');
  });

app.listen(3001, () => {
    console.log('listening on port 3001');
});