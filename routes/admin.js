const path = require('path');

const express = require('express');
const authenticatemiddleware = require('../middleware/auth');

const adminController = require('../controllers/admin');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/signup', adminController.signup);
router.post('/login',adminController.login);
router.post('/addexpense', expenseController.addexpense )

router.get('/getexpenses', authenticatemiddleware.authenticate,expenseController.getexpenses)

router.delete('/deleteexpense/:expenseid',expenseController.deleteexpense)
module.exports = router;