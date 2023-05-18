import { useTracksContext } from '../hooks/useTracksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams } from 'react-router'
import dvd from './dvd.jpg'

import ThreeDotsDropDown from './threeDotsDropDown';
const TrackDetails = ({ track }) => {
  const { dispatch } = useTracksContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  let user_name = useParams()
  if (user_name.name) user_name = user_name.name.substring(1)
  let p = useRef(track.plays)
  const [genre, setGenre] = useState(track.genre)
  let likess = useRef(track.likes)
  console.log(likess.current)
  const [audioURL, setAudioURL] = useState(track.audioURL)
  const [imageURL, setImageURL] = useState(track.imageURL)
  const [title, setTitle] = useState(track.title)
  const [trackUserName, setTrackUserName] = useState(track.user_name)
  const id = useRef(track._id)
  console.log(user_name)
  const [imageSrc, setImageSrc] = useState()
  const showDvD = (e) => {

    const dvd = e.currentTarget.previousSibling
    dvd.style.left = '30px'

  }
  const hideDvD = (e) => {
    const temp = e.currentTarget.parentNode.nextSibling
    const audio = temp.getElementsByTagName('audio')[0]
    if (audio.paused) {
      const dvd = e.target.previousSibling
      dvd.style.left = '0px'
    }


  }
  const updatePlays = async () => {


    const plays = p.current + 1
    p.current = p.current + 1
    const likes = likess.current
    const user_name = trackUserName
    const trackToUpdate = { plays, genre, likes, audioURL, imageURL, title, user_name }
    const response = await fetch('/api/tracks/' + id.current, {
      method: 'PATCH',
      body: JSON.stringify(trackToUpdate),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()


    if (response.ok) {



      dispatch({ type: 'UPDATE_TRACK', payload: json })
    }
  }
  const updateLikesColors = (e) => {
    if (user && likess.current.includes(user.name)) {
      return "#f73e7c"
    }
    else {
      return "gray"
    }
  }



  const increaseLikes = async () => {

    likess.current = [...likess.current, user.name]
    console.log(likess.current)
    const likes = likess.current
    console.log('likes=', likes)
    const plays = p.current
    const user_name = trackUserName
    const trackToUpdate = { plays, genre, likes, audioURL, imageURL, title, user_name }
    const response = await fetch('/api/tracks/' + id.current, {
      method: 'PATCH',
      body: JSON.stringify(trackToUpdate),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()


    if (response.ok) {



      dispatch({ type: 'UPDATE_TRACK', payload: json })
    }
  }
  const decreaseLikes = async () => {
    var index = likess.current.indexOf(user.name);
    if (index !== -1) {
      likess.current.splice(index, 1);
    }
   
    console.log(likess.current)
    const likes = likess.current
    console.log('likes=', likes)
    const plays = p.current
    const user_name = trackUserName
    const trackToUpdate = { plays, genre, likes, audioURL, imageURL, title, user_name }
    const response = await fetch('/api/tracks/' + id.current, {
      method: 'PATCH',
      body: JSON.stringify(trackToUpdate),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()


    if (response.ok) {



      dispatch({ type: 'UPDATE_TRACK', payload: json })
    }
  }

  const updateLikes = () => {
    if (likess.current.includes(user.name)) {
      decreaseLikes()
    }
    else {
      increaseLikes()
    }
  }

  useEffect(() => {

  }, [dispatch])

  return (
    <div className='flex gap-10 mb-3'>

      <div className='relative top-0 left-0'>
        <img className='h-40 w-40 min-w-fit min-h-fit relative top-0  left-0 transition-all duration-300  dvd' src={dvd}></img>
        <img className='object-cover h-40 w-40  cursor-pointer absolute top-0 left-0 album-image' onMouseOver={showDvD} onMouseOut={hideDvD} src={track.imageURL} alt='uploaded-file' onClick={
          (e) => {
            const temp = e.currentTarget.parentNode.nextSibling
            const audio = temp.getElementsByTagName('audio')[0]
            if (audio.paused) {
              audio.play()

              showDvD(e)
              updatePlays()
            }
            else {
              audio.pause()
              hideDvD(e)
            }
          }

        }></img>

      </div>
      <div >
        <div className='flex gap-20 justify-center items-center w-fit'>
          <h4 className='font-semibold capitalize '>{track.title}</h4>
          <p className='text-sm'>{formatDistanceToNow(new Date(track.createdAt), { addSuffix: true })}</p>
          {(user && user_name === user.name) && <ThreeDotsDropDown track={track}></ThreeDotsDropDown>}
        </div>

        <p className='capitalize cursor-pointer' onClick={(e) => navigate(`/:${track.user_name}`)}>{track.user_name}</p>
        <audio controlsList='noplaybackrate nodownload ' controls>
          <source src={track.audioURL}></source>
        </audio>
        <div className='flex gap-5'>
          <p className='flex items-center justify-center'><Icon path={mdiPlay} size={1} />{p.current}</p>
          <p className='flex items-center justify-center'><Icon path={mdiHeart} color={updateLikesColors()} onClick={updateLikes} size={0.70} className='cursor-pointer likes' /> {likess.current.length}</p>
        </div>










      </div>
    </div>


  )
}

export default TrackDetails