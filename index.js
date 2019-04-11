var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var moment = require('moment');
var marked = require('marked');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var dataUtil = require("./data-utils");

var _DATA = dataUtil.loadData().food_reviews;
var foods = [];
_DATA.forEach(element => foods.push(element.name));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  res.render("home", {data: _DATA,search_msg: "Not finding what you're looking for? Be the first to write a review!"});
});

app.get('/random',function(req,res){
  var index = Math.floor(Math.random() * (_DATA.length - 1 + 0) ) + 1;

  console.log(index);
  res.render("home",{data: [_DATA[index]]})
})

app.get('/most',function(req,res){
  var max = 0;
  var most = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].reviews.length > max){
      max = _DATA[i].reviews.length;
      most = [];
      most.push(_DATA[i]);
    }
    else if (_DATA[i].reviews.length === max){
      most.push(_DATA[i]);
    }
  }
  res.render("home",{data: most})
})

app.get('/least',function(req,res){
  var min = _DATA[0].reviews.length;
  var least = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].reviews.length < min){
      min = _DATA[i].reviews.length;
      least = [];
      least.push(_DATA[i]);
    }
    else if (_DATA[i].reviews.length === min){
      least.push(_DATA[i]);
    }
  }
  res.render("home",{data: least})
})

app.get('/best',function(req,res){
  var max = 0;
  var best = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].rating > max){
      max = _DATA[i].rating;
      best = [];
      best.push(_DATA[i]);
    }
    else if (_DATA[i].rating === max){
      best.push(_DATA[i]);
    }
  }
  res.render("home",{data: best})
})

app.get('/worst',function(req,res){
  var min = _DATA[0].rating;
  var worst = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].rating < min){
      min = _DATA[i].rating;
      worst = [];
      worst.push(_DATA[i]);
    }
    else if (_DATA[i].rating === min){
      worst.push(_DATA[i]);
    }
  }
  res.render("home",{data: worst})
})

app.get('/api/food',function(req,res){
  res.json(_DATA);
})


app.get("/create", function(req, res) {
  res.render('create');
});

app.get('/food/:food_id',function(req,res){
  var _id = parseInt(req.params.food_id);
  var food = {};
    var found = false;
    _DATA.forEach(element => {
        
        if(element.food_id === _id){
            food = element;
            found = true;
        }
    });
    if(!found){
      return res.send("Error: Food not found");
  }
  console.log(food);
  
    var html = `<body><table>`;
    html += `<tr><td>Food ID:</td><td>` + JSON.stringify(food.food_id) + `</td></tr>\n`;
    html += `<tr><td>Food Name:</td><td>` + JSON.stringify(food.name) + `</td></tr>\n`;
    html += `<tr><td>Rating:</td><td>` + JSON.stringify(food.rating) + `</td></tr>\n`;
    html += `<table>`;
    food.reviews.forEach(review => {
      html += `<tr><td>Reviewer Name:</td><td>` + JSON.stringify(review.reviewer_name) + `</td></tr>\n`;
      html += `<tr><td>Reviewer's Rating:</td><td>` + JSON.stringify(review.rating) + `</td></tr>\n`;
      html += `<tr><td>Review Title:</td><td>` + JSON.stringify(review.title) + `</td></tr>\n`;
      html += `<tr><td>Review:</td><td>` + JSON.stringify(review.content) + `</td></tr>\n`;
      html += `<tr><td>Date:</td><td>` + JSON.stringify(review.time) + `</td></tr>\n`;
    }
      );
    
    html += `</table></table></body>`;
    res.send(html);
})

app.get("/api/id/:food_id", function(req, res) {
  var _id = parseInt(req.params.food_id);
  var food = {};
  var found = false;
  _DATA.forEach(element => {
      
      if(element.food_id === _id){
          food = element;
          found = true;
      }
  });
  if(!found){
    return res.json({});
}
else{
  res.json(food);
}
});

app.get("/api/best/", function(req, res) {
  var max = 0;
  var best = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].rating > max){
      max = _DATA[i].rating;
      best = [];
      best.push(_DATA[i]);
    }
    else if (_DATA[i].rating === max){
      best.push(_DATA[i]);
    }
  }
  res.json(best);
});

app.get("/api/worst/", function(req, res) {
  var min = _DATA[0].rating;
  var worst = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].rating < min){
      min = _DATA[i].rating;
      worst = [];
      worst.push(_DATA[i]);
    }
    else if (_DATA[i].rating === min){
      worst.push(_DATA[i]);
    }
  }
  res.json(worst)
})


app.get("/api/least/", function(req, res) {
  var min = _DATA[0].reviews.length;
  var least = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].reviews.length < min){
      min = _DATA[i].reviews.length;
      least = [];
      least.push(_DATA[i]);
    }
    else if (_DATA[i].reviews.length === min){
      least.push(_DATA[i]);
    }
  }
  res.json(least)
})

app.get("/api/most/", function(req, res) {
  var max = 0;
  var most = [];
  for(var i = 0; i < _DATA.length; i++){
    if (_DATA[i].reviews.length > max){
      max = _DATA[i].reviews.length;
      most = [];
      most.push(_DATA[i]);
    }
    else if (_DATA[i].reviews.length === max){
      most.push(_DATA[i]);
    }
  }
  res.json(most)
})

app.post('/create', function(req, res) {
  var body = req.body;
  
 // body.content = marked(body.content);
 if(parseInt(body.rating) > 10){
  body.rating = 10;
}
else if(parseInt(body.rating) < 0){
  body.rating = 0;
}
  // Add time and check if food exists on the site yet
  body.time = moment().format('MMMM Do YYYY, h:mm a');

  var id = foods.indexOf(body.food);
  if(id < 0){
    foods.push(body.food);
    id = foods.indexOf(body.food);
    _DATA.push({
      "food_id": id,
      "name": body.food,
      "rating": 0,
      "reviews": []
    });
  }
  
  var index = 0
  // Add new review post
  for(var i = 0; i < _DATA.length; i++){
    if(_DATA[i].food_id === id){
      _DATA[i].reviews.push(body);
      index = i;
    }
  }

  //calculate new rating
  var sum = 0;
  _DATA[index].reviews.forEach(element => {
    if(parseInt(element.rating) < 0){
      sum += 0;
    }
    else if (parseInt(element.rating) > 10){
      sum += 10;
    }
    else{
    sum += parseInt(element.rating);
    }
    console.log("adding rating of " + element.rating + " to get a sum of " + sum)
  });
  console.log("length of reviews array: " + _DATA[index].reviews.length);
  console.log("new rating: " + (sum / _DATA[index].reviews.length));
  var new_rate = (sum / _DATA[index].reviews.length);
  _DATA[index].rating = new_rate;

  // Save changes
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.post('/api/create', function(req, res) {
  console.log("body: " + req.body.food)
  var body = req.body;
  
  //body.content = marked(body.content);

  if(parseInt(body.rating) > 10){
    body.rating = 10;
  }
  else if(parseInt(body.rating) < 0){
    body.rating = 0;
  }

  // Add time and check if food exists on the site yet
  body.time = moment().format('MMMM Do YYYY, h:mm a');

  var id = foods.indexOf(body.food);
  if(id < 0){
    foods.push(body.food);
    id = foods.indexOf(body.food);
    _DATA.push({
      "food_id": id,
      "name": body.food,
      "rating": 0,
      "reviews": []
    });
  }
  
  var index = 0
  // Add new review post
  for(var i = 0; i < _DATA.length; i++){
    if(_DATA[i].food_id === id){
      _DATA[i].reviews.push(body);
      index = i;
    }
  }

  //calculate new rating
  var sum = 0;
  _DATA[index].reviews.forEach(element => {
    if(parseInt(element.rating) < 0){
      sum += 0;
    }
    else if (parseInt(element.rating) > 10){
      sum += 10;
    }
    else{
    sum += parseInt(element.rating);
    }
    console.log("adding rating of " + element.rating + " to get a sum of " + sum)
  });
  console.log("length of reviews array: " + _DATA[index].reviews.length);
  console.log("new rating: " + (sum / _DATA[index].reviews.length));
  var new_rate = (sum / _DATA[index].reviews.length);
  _DATA[index].rating = new_rate;

  // Save changes
  dataUtil.saveData(_DATA);
  res.redirect("/");
});


app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
