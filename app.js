var express=require("express"); 
var app=express() ;
var bodyParser=require("body-parser");

 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ 
	extended: false
})); 
app.use(bodyParser.json());
app.set('view engine', 'ejs');

require('./routes')(app); 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.render('checkin'); 
}).listen(5000) 


console.log("server listening at port 5000"); 
