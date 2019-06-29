const express = require('express');
const router = express.Router();
const Transaction = require('../controller/transaction.controller')
const auth = require('../auth/auth');

router.post('/transaction', auth, Transaction.addData);
router.post('/transaction/group', auth, Transaction.getData);
router.post('/transaction/group/debt', auth, Transaction.getDebtData);

module.exports = router;