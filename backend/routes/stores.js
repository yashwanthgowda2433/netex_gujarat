const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { addStores, getAllStoresLists, getAllManagersWithStores, getAllStoresWithManagers, getAllNotAddedStoresLists, updateStores, deleteStore, getStoresCount } = require('../controllers/storesController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)


router.post('/add', addStores)
router.post('/update', updateStores)
router.post('/deleteStore', deleteStore)
router.post('/getAllStoresLists', getAllStoresLists)
router.post('/getAllManagersWithStores', getAllManagersWithStores)
router.post('/getAllStoresWithManagers', getAllStoresWithManagers)
router.post('/getAllNotAddedStoresLists', getAllNotAddedStoresLists)
router.post('/getStoresCount', getStoresCount)




module.exports = router