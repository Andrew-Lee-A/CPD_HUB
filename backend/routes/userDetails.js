const express = require('express')
const {
    getUserCPDPoints,
    updateUserCPDPoints,
    getUserDetails,
    updateUserDetails,
} = require('../controllers/userDetailsController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

// GET a user's CPD Points Summary
router.get('/', getUserCPDPoints)

// UPDATE a user's CPD Points Summary
router.patch('/', updateUserCPDPoints)

// GET user details
router.get('/details', getUserDetails)

// UPDATE user details
router.put('/details', updateUserDetails)

module.exports = router