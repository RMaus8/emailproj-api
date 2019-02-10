const   express = require('express'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        mongoose = require('mongoose'),
        path = require('path'),
        user = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/emailproject';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true})
        .then( () => console.log('mongodb connected...'))
        .catch(err => console.log(err));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "this is a test",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: null}
}))

app.use('/', user);

app.listen(PORT, () => {
    console.log('server started')
})