var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser=require('body-parser');
var http=require('http');
var cors=require('cors');

// var jsonParser=bodyParser.json({limit:"10mb",type:"application/json"});
// var urlencodedParser=bodyParser.urlencoded({limit:"10mb",extended:false,parameterLimit:5000});

var shoppingCartRoute=require("./routes/shoppingCart")
var userRoute=require("./routes/users")
var mongoUtil=require("./util/mongodbManager")

var app = express();

app.set('port',3001);
app.use(function (req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  next();
})
app.use(cookieParser());
app.use(logger('dev'));

// app.use(bodyParser.json({limit:"10mb",type:"application/json"}));
// app.use(bodyParser.urlencoded({limit:"10mb",extended:false,parameterLimit:5000}));

app.use(express.json());
app.use(express.urlencoded());

app.get('/getCartItem',cors(),shoppingCartRoute.getCartItems);
app.options('/getCartItem',cors());

app.post('/addCartItem',cors(),shoppingCartRoute.addCartItem);
app.options('/addCartItem',cors());

app.post('/updateCartItem',cors(),shoppingCartRoute.updateCart);
app.options('/updateCartItem',cors());

app.post('/deleteCartItem',cors(),shoppingCartRoute.removeItem);
app.options('/deleteCartItem',cors());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var server = http.createServer(app).listen(app.get("port"),function () {
  console.log("Shopping Cart Server Started");
  mongoUtil.openConnection();
});

module.exports = app;
