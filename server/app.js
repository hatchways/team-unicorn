const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require("./config/db");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const uploadRouter = require("./routes/api/upload");
const userRouter = require("./routes/user");
const cardsRouter = require("./routes/api/cards");
const colRouter = require("./routes/api/columns");
const boardRouter = require("./routes/api/boards");

const { json, urlencoded } = express;

var app = express();

// Connect Database
connectDB();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/columns", colRouter);
app.use("/api/boards", boardRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

// STRIPE 
app.use(cors());
app.use(bodyParser.json());

const stripe = require('stripe')(process.env.STRIPESECRET);

app.post('/pay', async (req, res) => {
  const {email} = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: 'usd',
      metadata: {integration_check: 'accept_a_payment'},
      receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
})

app.post('/subscribe', async (req, res) => {
  const {email, payment_method} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: 'price_1HX6TzD9AsNutHPovtPPJ9yY' }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({'client_secret': client_secret, 'status': status});
})

module.exports = app;
