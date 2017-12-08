var express    = require('express');
var app        = express();
var path       = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// Activate bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the port of our application
// Process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// Make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// Set the API route
app.post('/api/sendMail', function(req,res){

    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            secure: false,
            port: 587,
            auth: {
                user: 'ggq6owlbdhqyeoqx@ethereal.email',
                pass: 'awjwBRzfswgcjVdr3p'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        var mailOptions = {
          from: req.body.email,
          to: 'joachim.eivindsen@gmail.com',
          subject: '[CONTACT FORM] from ' + req.body.name,
          text: req.body.message + '\n\n' + req.body.email
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
});

// Set the home page route
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Running the application
app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});
