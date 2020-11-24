const APP_SECRET = 'd6332e4fcb80d3f0a46b3badbacd42d5';
const VALIDATION_TOKEN = '123465798saghjkjlk632ghasvcbjknml';
const PAGE_ACCESS_TOKEN = 'EAAOLvUs7NE8BAGxtiWVVAb7MWZA174WV987DKuGkYEon8Iw0c5Pc2i2uclSM8OZB0ZBqGIKK41I9kqLrI31TTp0i78N7MDSam02IwMZBJ4M1ZBpqbZBSPcsIGZAZA6R5qNGiccAwRBxAMwBD2TRSZCNv4B7234ZBFfA6AUjdbZAvoQCtwZDZD';

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});


// webhook
// Validate tooken bên app facebook gửi qua
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

// Xử lý tin nhắn từ người dùng
app.post('/webhook', function(req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                if (message.message.text) {
                    var text = message.message.text;
                    sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
                }
            }
        }
    }
    res.status(200).send("OK");
});

// Dùng Api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: PAGE_ACCESS_TOKEN,
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.IP || "0.0.0.0");

server.listen(app.get('port'), app.get('ip'), function() {
    console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});