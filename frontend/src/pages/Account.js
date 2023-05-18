import { useEffect }from 'react'
import { useTracksContext } from "../hooks/useTracksContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useParams } from 'react-router'
// components
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'

const Account = () => {
  const {tracks, dispatch} = useTracksContext()
  const {user} = useAuthContext()
  let user_name = useParams()
  user_name = user_name.name.split(user_name.name[0])[1]
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/tracks', {
        headers: {'Authorization': user_name},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TRACKS', payload: json})
      }
    }

  
      fetchWorkouts()
    
  }, [dispatch])

  return (
    <div className="home flex flex-col">
      <div className="tracks">
        {tracks && tracks.map((track) => (
          <TrackDetails key={track._id} track={track} />
        ))}
      </div>
      <br></br>
      {(user_name && user) ? user_name === user.name ?<div> <button className="bg-blue-200 p-2 hover:bg-blue-300 text-gray-700" onClick={(e) => {
        const temp = e.currentTarget.nextElementSibling
        if (temp.className.includes('hidden')) {
          temp.classList.remove('hidden')
          temp.classList.add('block')
        }

      }}>Upload a New Track</button><TrackForm /></div>: <></> : <></>}
      
      
    </div>
  )
}

export default Account