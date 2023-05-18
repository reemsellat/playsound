import { TrackContext } from '../context/TrackContext'
import { useContext } from 'react'

export const useTracksContext = () => {
  const context = useContext(TrackContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}