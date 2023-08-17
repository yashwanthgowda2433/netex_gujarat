const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// ANALYST TASKS controller functions
const { addAnalystTask ,getAnalystTasks, getAnalystL3tlTasks} = require('../controllers/analyst/controller/taskController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/add', addAnalystTask);
router.post('/analyst/get', getAnalystTasks);
router.post('/analyst/getL3tl', getAnalystL3tlTasks);


// ANALYST TASKS END


module.exports = router
