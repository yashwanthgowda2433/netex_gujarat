const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { addAnalystTask } = require('../controllers/analyst/taskController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/add', addAnalystTask);
// ANALYST TASKS END


module.exports = router
