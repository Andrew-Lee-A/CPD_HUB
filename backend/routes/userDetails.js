const express = require('express')
const {
    getUserCPDSummary,
    updateCpdEvent,
} = require('../controllers/userDetailsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

// GET all cpdEvents
router.get('/', getUserCPDSummary)

// UPDATE a user's CPD Summary
router.patch('/', updateCpdEvent)
module.exports = router