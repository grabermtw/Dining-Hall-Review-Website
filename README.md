# UMD Dining Hall Food Reviews Website

Very basic website and API that aggregates reviews for the dining halls of UMD.

## API

GET all endpoint route: `/api/food`

GET particular food by int ID endpoint route: `/api/id/:food_id`

GET best food endpoint route: `/api/best`

GET worst food endpoint route: `/api/worst`

GET most-reviewed food(s) endpoint route: `/api/most`

GET least-reviewed food(s) endpoint route: `/api/least`

### POST

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
