//Partial assist from: https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147
//Install express server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const appPort = (process.env.PORT || 8080);
app.use(express.static(__dirname + '/app')); //Serve only the static files form the dist directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//API files
const calendar_events = require('./api/calendar_events.js');
const users = require('./api/users.js');

app.route('/').get(function(req,res) {
    res.sendFile(path.join(__dirname+'/app/index.html'));
});

//CALENDAR EVENT CALLS
app.post('/calendar_events', calendar_events.createEvent);
app.delete('/calendar_events/:event_id', calendar_events.deleteEvent);
app.get('/calendar_events/event/:event_id', calendar_events.eventInfoPerEvent);
app.get('/calendar_events/user/:user_id', calendar_events.eventInfoPerUser);
app.patch('/calendar_events/:event_id', calendar_events.updateEvent);

//USER CALLS
app.post('/users', users.createUser);
app.delete('/users/:user_id', users.deleteUser);
app.get('/users/:user_id', users.userInfo);
app.patch('/users/:user_id', users.updateUser);


// Start the app by listening on the default Heroku port
app.listen(appPort);
console.log("Listening on port " + appPort);