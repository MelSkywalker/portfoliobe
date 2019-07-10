if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mail = process.env.MAIL;
const mailgun = require('mailgun-js');
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN });
let data = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', upload.none(), function (req, res) {
    console.log(req.body),

    data = {
        from: `${req.body.name} <${req.body.email}>`,
        to: mail,
        subject: req.body.subject,
        text: `Mensaje de ${req.body.name}\n<${req.body.email}>:\n${req.body.message}`
    };

    mg.messages().send(data, function (error, body) {
        if(!error) console.log(body);
        else console.error('Error: ', error);
    })

    res.send('Got a POST request');
});

app.listen(process.env.PORT || 3001, () => {
    console.log('listening on port 3001');
});