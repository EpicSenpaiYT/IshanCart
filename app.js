const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session');


// require('./prod')(app)

const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./model/user');


// const MONGODB_URI = 'mongodb://localhost/ishankart';
const MONGODB_URI = 'mongodb+srv://Ishan:Gudmorning1@cluster0.vlyj4.mongodb.net/?<dbname>retryWrites=true&w=majority';


// saving sessions 

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});



// Using body-Parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Set template Engine (ejs) into my app 
app.set('view engine', 'ejs');
// The directory name of my ejs templates 
app.set('views', 'views');




// Make public folder availble to entire app 

app.use(express.static(path.join(__dirname, 'public')));



// Storing session in store of sessions collection 

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);





//  Using Middleware  checking is there any session is availble 

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});






// Importing all my routes 
const shopRoutes = require('./routes/shop.js')
const adminRoutes = require('./routes/admin.js')
const authRoutes = require('./routes/auth')



// Using my all  Routes
app.use(shopRoutes);
app.use(adminRoutes);
app.use(authRoutes);



// wild route must use at last after using every route 

app.use('*', (req, res) => {
  res.render('wild_route.ejs', { isAuthenticated: false  , user_name :  req.session.user_name})
}) 








mongoose.connect(
  MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
)
  .then(() => {

    console.log('DB Connected')
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Listening on ${port} port !! `)
    })


  })

  .catch((err) => {
    console.log(err)
  })