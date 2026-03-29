const express = require("express");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();

const connectDB = require("./config/database");
const { notFoundHandler, errorHandler } = require("./middleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const User = require("./models/user");

const app = express();

// Database connection
connectDB();

// View setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Session configuration
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.ATLAS_DB }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

// Routes
app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/listings", propertyRoutes);
app.use("/bookings", bookingRoutes);


// Home route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
