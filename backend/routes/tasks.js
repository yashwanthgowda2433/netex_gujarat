const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// ANALYST TASKS controller functions
const { addAnalystTask, getAnalystTasks, getAnalystL3tlTasks} = require('../controllers/analyst/controller/taskController')

// L3TL TASKS controller functions
const { getL3tlTasks, getL3TlExecutiveTasks, l3approveFVTasks, l3TransferTasks, getTranferTasks, updateTransferTaskStatus, l3closeWithoutFv, l3ForwardtoRF, l3withDraw, l3movetoPending, l3deleteSelected } = require('../controllers/l3tl/controller/taskController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// ANALYST TASKS START
router.post('/analyst/add', addAnalystTask);
router.post('/analyst/get', getAnalystTasks);
router.post('/analyst/getL3tl', getAnalystL3tlTasks);
// ANALYST TASKS END

// L3TL TASKS START
router.post('/l3tl/get', getL3tlTasks);
router.post('/l3tl/getExecutiveTasks', getL3TlExecutiveTasks);
router.post('/l3tl/approveFVTasks', l3approveFVTasks);
router.post('/l3tl/transfer', l3TransferTasks);
router.post('/l3tl/getTranferTasks', getTranferTasks);
router.post('/l3tl/updateTransferTaskStatus', updateTransferTaskStatus);
router.post('/l3tl/closeWithoutFv', l3closeWithoutFv);
router.post('/l3tl/forwardtoRF', l3ForwardtoRF);
router.post('/l3tl/withDraw', l3withDraw);
router.post('/l3tl/movetoPending', l3movetoPending);
router.post('/l3tl/deleteSelected', l3deleteSelected);


// L3TL TASKS END

module.exports = router
