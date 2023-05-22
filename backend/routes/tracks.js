const express = require('express')
const {
 
  createTrack,
  getTracks,
  getTrack,
  deleteTrack,
  updateTrack,

} = require('../controllers/trackController')


const router = express.Router()

// require auth for all track routes


// GET all tracks


router.get('/', getTracks)

//GET a single track
router.get('/:id', getTrack)

// POST a new track
router.post('/', createTrack)

// DELETE a track
router.delete('/:id', deleteTrack)

// UPDATE a track
router.patch('/:id', updateTrack)


module.exports = router