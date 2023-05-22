const Track = require('../models/trackModel')
const mongoose = require('mongoose')

// get all tracks


const getTracks = async (req, res) => {
  const { authorization } = req.headers
  const tracks = await Track.find({ 'user_name': authorization }).sort({ createdAt: -1 })

  res.status(200).json(tracks)
}

// get a single track
const getTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such track' })
  }

  const track = await Track.findById(id)

  if (!track) {
    return res.status(404).json({ error: 'No such track' })
  }

  res.status(200).json(track)
}


// create new track
const createTrack = async (req, res) => {
  const { genre, audioURL, imageURL, title, user_name } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!genre) {
    emptyFields.push('genre')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    let plays = 0;
    const likes =[]
    const track = await Track.create({ plays, genre, likes, audioURL, imageURL, title, user_name })
    res.status(200).json(track)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a track
const deleteTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such track' })
  }

  const track = await Track.findOneAndDelete({ _id: id })

  if (!track) {
    return res.status(400).json({ error: 'No such track' })
  }

  res.status(200).json(track)
}

// update a track
const updateTrack = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such track' })
  }

  const track = await Track.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!track) {
    return res.status(400).json({ error: 'No such track' })
  }

  res.status(200).json(track)
}


module.exports = {

  getTracks,
  getTrack,
  createTrack,
  deleteTrack,
  updateTrack
}