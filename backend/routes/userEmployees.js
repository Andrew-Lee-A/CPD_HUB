const express = require('express')
const {
    getUserEmployees,
} = require('../controllers/userEmployeeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

router.get('/', getUserEmployees)

module.exports = router