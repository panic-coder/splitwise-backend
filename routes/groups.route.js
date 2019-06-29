const express = require('express');
const router = express.Router();
const Group = require('../controller/groups.controller')
const auth = require('../auth/auth');

router.post('/group', auth, Group.addData);
router.put('/group', auth, Group.update);

module.exports = router;
