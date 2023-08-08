const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, addUser, getUser, getAnalystOptiEngineers } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/add', addUser)

// require auth for all routes
router.use(requireAuth)

router.post('/get', getUser)

// ANALYST API's Start
//get Opti Engineers
router.post('/analyst/getOptiEngineers', getAnalystOptiEngineers)
// ANALYST API's End




module.exports = router