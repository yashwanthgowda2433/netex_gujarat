const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// ANALYST TASKS controller functions
const { getReport } = require('../controllers/analyst/controller/testController')
const { getPreReport } = require('../controllers/analyst/controller/testPreController')
const { getPostReport } = require('../controllers/analyst/controller/testPostController')


const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/getReport', getReport);
router.post('/analyst/getPreReport', getPreReport);
router.post('/analyst/getPostReport', getPostReport);

// ANALYST TASKS END


module.exports = router
