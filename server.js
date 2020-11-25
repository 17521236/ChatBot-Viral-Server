const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

const mailController = require('./controller/mail.controller')
    // load middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST,PUT,PATCH,DELETE,GET,HEAD,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// router here
app.get('/', (req, res) => {
    res.send('server OK');
})

app.post('/api/send-mail', mailController.sendmail);

// connection
app.listen(port, () => {
    console.log(`Port ${port} is running ...`)
})