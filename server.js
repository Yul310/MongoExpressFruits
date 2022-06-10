/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan");
const methodOverride = require("method-override")
// const req =require("express/lib/request")

const path = require("path")
const Fruit = require("./models/fruit");
const FruitRouter = require("./controllers/fruits")
const UserRouter = require("./controllers/users")
const session = require("express-session")
const MongoStore = require("connect-mongo")



  /////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})




/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////



app.use("/fruits",FruitRouter)
app.use("/users",UserRouter) 
app.get("/", (req, res) => {
   res.render("index.liquid")
  });



  
  


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));


// index route
// app.get("/fruits", (req, res) => {
//     Fruit.find({}, (err, fruits) => {
//       res.render("fruits/index.liquid", { fruits });
//     });
//   });
  


 