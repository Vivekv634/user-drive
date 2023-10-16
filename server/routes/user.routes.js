const express = require('express');
const userControllers = require('../controllers/user.controllers');
const userAuth = require('../middlewares/user.auth');

const router = express.Router();

router.get('/getData', userAuth.authenticate, userControllers.getData);
router.post('/updateData', userAuth.authenticate, userControllers.updateData);
router.delete('/deleteData', userAuth.authenticate, userControllers.deleteData);

module.exports = router;