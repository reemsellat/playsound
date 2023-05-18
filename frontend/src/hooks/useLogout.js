import { useAuthContext } from './useAuthContext'
import { useTracksContext } from './useTracksContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchTracks } = useTracksContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchTracks({ type: 'SET_TRACKS', payload: null })
  }

  return { logout }
}