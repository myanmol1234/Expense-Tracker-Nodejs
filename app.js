
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(cors())

const adminRoutes = require('./routes/admin');
const sequelize = require('./utili/database');
const Expense = require('./models/expense');
const User = require('./models/User');
//const premiumroutes= require('./routes/purchase');
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(adminRoutes);
//app.use(premiumroutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

