
# PROJECT NAME

---

Name: Matthew Graber

Date: 4/10/2019

Project Topic: UMD Dining Hall Food Reviews

URL: https://umd-dining-hall-food-reviews.herokuapp.com/

---


### 1. Data Format and Storage

Food data point fields:
- `Field 1`: food_id  `Type: Number`
- `Field 2`: name     `Type: String`
- `Field 3`: rating   `Type: Number`
- `Field 4`: reviews  `Type: [review object]`
- `review object fields:`
- `Field 1`: food     `Type: String`
- `Field 2`: reviewer_name `Type: String`
- `Field 3`: rating   `Type: Number`
- `Field 4`: title    `Type: String`
- `Field 5`: content  `Type: String`
- `Field 6`: time     `Type: String`

Schema: 
```javascript
{
   "food_id": Number,
   "name": String,
   "rating": Number,
   "reviews": [
      {
         "food": String,
         "reviewer_name": String,
         "rating": Number,
         "title": String,
         "content": String,
         "time": String
      }
   ]
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       food: 'Chocolate Milk',
       reviewer_name: 'Tim',
       rating: 9,
       title: 'Phenomenal Cow Juice',
       content: 'Absolutely exquisite. Would drink again'

    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET all endpoint route: `/api/food`
GET particular food by int ID endpoint route: `/api/id/:food_id`
GET best food endpoint route: `/api/best`
GET worst food endpoint route: `/api/worst`
GET most-reviewed food(s) endpoint route: `/api/most`
GET least-reviewed food(s) endpoint route: `/api/least`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Home -> `/`
2. Random Food -> `/random`
3. Most-Reviewed Food -> `/most`
4. Least-Reviewed Food -> `/least`
5. Best-Reviewed Food -> `/best`
6. Worst-Reviewed Food -> `/worst`
7. Write a Review! -> `/create`

