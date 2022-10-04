const express = require('express')
const {
    createCpdEvent,
    getCpdEvent,
    getCpdEvents,
    deleteCpdEvent,
    updateCpdEvent
} = require('../controllers/cpdController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//needs auth middleware to pass before router moves to routes
router.use(requireAuth)

// GET all cpdEvents
router.get('/', getCpdEvents)

// GET a single cpdEvent
router.get('/:id', getCpdEvent)

// POST a new cpdEvent
router.post('/', createCpdEvent)

// DELETE a cpdEvent
router.delete('/:id', deleteCpdEvent)

// UPDATE a cpdEvent
router.patch('/:id', updateCpdEvent)

module.exports = router