const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { loginUser, addUser, getUser, getAnalystOptiEngineers, getL3tlEngineers } = require('../controllers/userController')

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

// L3tl API's Start
//get l3 Engineers
router.post('/l3tl/getL3tlEngineers', getL3tlEngineers)
// L3tl API's End



module.exports = router