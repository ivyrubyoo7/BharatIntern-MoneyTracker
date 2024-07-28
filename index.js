const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.render('index', { transactions });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/add', async (req, res) => {
  try {
    console.log(req.body); 
    const { type, amount, description } = req.body;
    const newTransaction = new Transaction({ type, amount, description });
    await newTransaction.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
