const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// ANALYST TASKS controller functions
const { getReport } = require('../controllers/analyst/controller/testController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/getReport', getReport);

// ANALYST TASKS END


module.exports = router
