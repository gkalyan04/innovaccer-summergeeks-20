// NodeMailer Setup
var username = "" // Enter Admin Email-Address here
var password = "" // Enter Admin password here

// Twilio Configuration
const accountSid = ''; // Enter your Twilio AccoundSID here
const authToken = ''; // Enter your Twilio AuthToken
const private_number = '' // Enter private generated number

var express=require("express"); 
var app=express() ;
var bodyParser=require("body-parser");
var nodemailer = require('nodemailer');
const client = require('twilio')(accountSid, authToken);
const path = require('path');
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/database'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("Connected to database at: mongodb://localhost:27017"); 
}) 

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
  user: username,
  pass: password
}
});

function send_mail(to_add,subject,html){
    var mailOptions = {
        from: username,
        to: to_add,
        subject: subject,
        html: html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

function send_sms(to_add,text){
    client.messages
    .create({
        body: text,
        from: private_number,
        to: `+91${to_add}`
    })
    .then(message => console.log(message.sid));
}

module.exports = (app) => {

    
    app.post('/checkin', function(req,res){ 
        var name = req.body.name; 
        var email =req.body.email; 
        var phone =req.body.phone; 
        d = new Date();
        var curr_time = d.toLocaleTimeString();
        var data = { 
            "name": name, 
            "email":email, 
            "check_in_time":curr_time,
            "phone":phone 
        } 
        
          

    db.collection("host").find({}).toArray(function(err, docs) {
        var last = docs.slice(-1)[0];
            if(last == undefined){
            data = {
                title: "First, please register host information"
            }
            return res.render('error',{data: data});
        }
        db.collection('visitor').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Visitor details captured successfully"); 
        });  
        var text = `<p>Name: ${name}</p>
                    <p>Phone: ${phone}</p></br>
                    <p>Email: ${email}</p></br>
                    <p>Check-in time: ${curr_time}</br>`
        send_mail(last.email,'New Visitor Details',text);

        var sms_data = `Name: ${name} \n
                        Phone: ${phone} \n
                        Email: ${email} \n
                        Check-in time: ${curr_time}`
        send_sms(last.phone,sms_data);

        let send_data = {
            title: `Welcome! ${name}`,
            name: "Don't forget to check-out when you are about to leave. Have a great day ahead!"
        }
        return res.render('success',{data:send_data});
    });      
    });

    app.post('/checkout', function(req,res){ 
    
    var check_phone = req.body.phone; 
    

    db.collection("host").find({}).toArray(function(err, docs) {
        var last = docs.slice(-1)[0];
        if(last == undefined){
        data = {
            title: "First, please register host information"
        }
            return res.render('error',{data: data});
        }
        
        db.collection("visitor").find({phone: check_phone}).toArray(function(err, resp){
        console.log(resp.length);
        if(err) throw err;
    
        if (resp.length > 0) {

        
            var myquery = {phone: check_phone};
            d1 = new Date();
            var newvalues = { $set: {check_out_time: d1.toLocaleTimeString()}}
        
            db.collection("visitor").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(" update successful");
            
            });
        

            var text = `<p>Name: ${resp[0].name}</p>
                        <p>Phone: ${resp[0].phone}</p></br>
                        <p>Check-in time: ${resp[0].check_in_time}</br>
                        <p>Check-out time: ${resp[0].check_out_time}</br>
                        <p>Host Name: ${last.name}</br>
                        <p>Address: Innovaccer Inc.</br>`

            send_mail(resp[0].email,`Your Today's visit`,text);

            var sms_data = `Name: ${resp[0].name} \n
                            Phone: ${resp[0].phone}\n
                            Check-in time: ${resp[0].check_in_time}\n
                            Check-out time: ${resp[0].check_out_time}\n
                            Host Name: ${last.name}\n
                            Address: Innovaccer Inc.`
            send_sms(resp[0].phone,sms_data);


        let send_data = {
            title: "Check-out successful!"
            }
        return res.render('success',{data:send_data});
            
        }
        else {
            data_new = {
            title: "Visitor information not found"
            }
            return res.render('error',{data:data_new});
        }
        });

    });

    });

    app.post('/host',function(req,res){

    var name = req.body.name; 
    var email =req.body.email; 
    var phone =req.body.phone; 
    
    var host_data = { 
            "name": name, 
            "email":email, 
            "phone":phone 
        } 
        

        db.collection('host').insertOne(host_data,function(err, collection){ 
            if (err) throw err; 
            console.log("Host details captured successfully"); 
        }); 

        new_data = {
        title:"Host registeration successful",
        name: `Now onwards, Visitor details will be sent to ${name}.`
        }
        return res.render('success',{data:new_data});
        
    }); 



    app.get('/checkout', function(req,res){
    res.render('checkout');
    });

    app.get('/host', function(req,res){
    res.render('host');
    });

}