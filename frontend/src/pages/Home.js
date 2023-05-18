import { useEffect }from 'react'
import { useTracksContext } from "../hooks/useTracksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'

const Home = () => {
  const {tracks, dispatch} = useTracksContext()
  const {user} = useAuthContext()
  const filterTracks=(e)=>{
       const genre=e.target.innerHTML
      tracks= tracks.filter(track=>track.genre===genre)
      dispatch({type:"SET_TRACKS",payload:tracks})

  }
  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch('/api/alltracks')
      
       
      const json = await response.json()
    
      if (response.ok) {
        dispatch({type: 'SET_TRACKS', payload: json})
        
      }
      else{
       
      }
    }

    
      fetchTracks()
    
  }, [dispatch])

  return (
    <div className='flex'>
       <div className='filter-tracks w-60 cursor-pointer'>
        <p className='hover:bg-sky-50 p-2' onClick={filterTracks}>All</p>
         <p className='hover:bg-sky-50 p-2'  onClick={filterTracks}>Classical</p>
         <p className='hover:bg-sky-50 p-2'>Pop</p>
         <p className='hover:bg-sky-50 p-2'>Rock</p>
         <p className='hover:bg-sky-50 p-2'>Hip Hop</p>
         <p className='hover:bg-sky-50 p-2'>Latin</p>
         <p className='hover:bg-sky-50 p-2'>Folk</p>
      </div>
      <div className="home pl-10">
    
      <div className="tracks">
        {tracks && tracks.map((track) => (
          <TrackDetails key={track._id} track={track} />
        ))}
      </div>
     
    </div>
    </div>
    
  )
}

export default Home