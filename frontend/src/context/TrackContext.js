import { createContext, useReducer } from 'react'
import update from 'react-addons-update';
export const TrackContext = createContext()

export const tracksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACKS':
      return {
        tracks: action.payload
      }
    case 'CREATE_TRACK':
      return {
        tracks: [action.payload, ...state.tracks]
      }
    case 'DELETE_TRACK':
      return {
        tracks: state.tracks.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_TRACK':
      return update(state, {
				tracks: {
					[action.payload._id]: {
						$set: action.payload
					}
				}
			});
    default:
      return state
  }
}

export const TracksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tracksReducer, {
    tracks: []
  })

  return (
    <TrackContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TrackContext.Provider>
  )
}