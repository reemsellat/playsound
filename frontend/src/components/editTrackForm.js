import { useState } from "react"
import { useTracksContext } from "../hooks/useTracksContext"
import { useAuthContext } from '../hooks/useAuthContext'
import uuid from 'react-uuid'
import { useParams } from 'react-router-dom'
import { storage } from "../firebase"
import { getDownloadURL, ref, updateMetadata, uploadBytesResumable } from "firebase/storage"
const EditTrackForm = ({track}) => {
  const { dispatch } = useTracksContext()
  const { user } = useAuthContext()
  const user_name = useParams().name.substring(1)
  const [image, setImage] = useState({
    selectedDocument: {
      file: '',
    },
    selectedFile: '',
  })
  
  const [title, setTitle] = useState(track.title)
  const [genre, setGenre] = useState(track.genre)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const uploadImage = (e) => {
    e.preventDefault()
    e.currentTarget.parentNode.classList.add('hidden')
    e.currentTarget.parentNode.classList.remove('block')
  
    const imageRef = ref(storage, `images/${image.selectedDocument.file[0].name}`)

    uploadBytesResumable(imageRef, image.selectedDocument.file[0])
    const uploadTask = uploadBytesResumable(imageRef, image.selectedDocument.file[0]);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (imageURL) => {
          const audioURL=track.audioURL
         let zero=0
          const trackToUpdate = {zero, genre,zero, audioURL, imageURL, title, user_name }
          const response = await fetch('/api/tracks/' + track._id, {
            method: 'PATCH',
            body: JSON.stringify(trackToUpdate),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          const json = await response.json()

          if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
          if (response.ok) {
            setTitle('')

            setError(null)
            setEmptyFields([])
            dispatch({ type: 'UPDATE_TRACK', payload: json })
          }

         



        });
      }
    )
    
  }


  return (
    <div className=" absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white border border-1 border-solid border-blue-500 rounded-md ">
      
      <form  onSubmit={uploadImage}>
        <h3 className='font-semibold text-center mb-5'>Edit track</h3>

        <label>Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}

        />
        <label htmlFor='select-genre'>Genre:</label>
        <select
          id="select-genre"
          type="text"
          onChange={(e) => {
            console.log(e.target[e.target.selectedIndex].text)
            setGenre(e.target[e.target.selectedIndex].text)
          }}
            value={genre.text}

        >
          <option disabled selected value>Choose</option>
          <option value="classical">Classical</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hip-hop">Hip Hop</option>
          <option value="latin">Latin</option>
          <option value="folk">Folk</option>


        </select>


        <label>Image:</label>
        <input
          type='file'
          onChange={(e) => {

            setImage({
              selectedDocument: {
                file: e.target.files,

              },
              selectedFile: e.target.files,
            })
          }}
          
        />
      
        <button className="bg-blue-200 p-2 hover:bg-blue-300 text-gray-700">Edit Track</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>

  )
}

export default EditTrackForm