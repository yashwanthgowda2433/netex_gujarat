const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// ANALYST TASKS controller functions
const { getAnalystReport} = require('../controllers/analyst/controller/testController');
const { getAnalystPreReport } = require('../controllers/analyst/controller/testPreController');
const { getAnalystPostReport } = require('../controllers/analyst/controller/testPostController');

// L3TL TASKS controller functions
const { getL3tlReport} = require('../controllers/l3tl/controller/testController');
const { getL3tlPreReport } = require('../controllers/l3tl/controller/testPreController');
const { getL3tlPostReport } = require('../controllers/l3tl/controller/testPostController');


const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/getReport', getAnalystReport);
router.post('/analyst/getPreReport', getAnalystPreReport);
router.post('/analyst/getPostReport', getAnalystPostReport);

// ANALYST TASKS END


// L3TL TASKS START
router.post('/l3tl/getReport', getL3tlReport);
router.post('/l3tl/getPreReport', getL3tlPreReport);
router.post('/l3tl/getPostReport', getL3tlPostReport);

// L3TL TASKS END

module.exports = router
