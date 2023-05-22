const Track = require('../models/trackModel')


const getAllTracks=async(req,res)=>{
const tracks=await Track.find({}).sort({createdAt: -1}).limit(10)

res.status(200).json(tracks)

}

module.exports={getAllTracks}