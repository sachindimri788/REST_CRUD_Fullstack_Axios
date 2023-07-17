const express = require('express');

const router=require('./userRoute');


router.use('/user',router);

module.exports = router;

