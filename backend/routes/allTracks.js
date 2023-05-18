const express = require('express')
const {
 
 getAllTracks

} = require('../controllers/allTracksController')


const router = express.Router()

router.get('/',getAllTracks)

module.exports=router

