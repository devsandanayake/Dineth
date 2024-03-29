const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const cookieParser = require('cookie-parser');



 


const DB = 'mongodb+srv://sliit:sliit@cluster0.y6hogqq.mongodb.net/new'

mongoose.connect(DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });


//import routes
const classRoute = require('./routes/class');
const lecturerRoute = require('./routes/lecturer');
const moduleRoute = require('./routes/module');
const timetableRoute = require('./routes/timetable');
const userRoute = require('./routes/user');


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/class', classRoute);
app.use('/lecturer', lecturerRoute);
app.use('/module', moduleRoute);
app.use('/timetable', timetableRoute);
app.use('/user', userRoute);


 


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

