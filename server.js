require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const {logger} =  require('./middleware/logEvents');
const { allowedNodeEnvironmentFlags } = require('process');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');
const mongoose = require("mongoose");

connectDB();



app.use(logger);

app.use(cors());


app.use(express.urlencoded({extended: false}));

app.use(express.json());

//use for css to be applied
//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'views', '/public')));

app.use('/', require('./routes/root'));
app.use('/states', require('./routes/api/states'));



app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

mongoose.connection.once('open', () => {
    console.log("connect to mongoDB");
    app.listen(PORT, () => console.log(`'Server running on port ${PORT}`));
});


