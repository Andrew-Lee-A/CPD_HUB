const express = require('express')
const {
    getUserCPDSummary
} = require('../controllers/userDetailsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

// GET all cpdEvents
router.get('/', getUserCPDSummary)

module.exports = router