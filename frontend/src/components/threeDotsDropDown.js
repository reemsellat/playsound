import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { storage } from '../firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useTracksContext } from '../hooks/useTracksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import EditTrackForm from './editTrackForm';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function ThreeDotsDropDown({track}){
    const { user } = useAuthContext()
    const { dispatch } = useTracksContext()
    const [showEdit,setSHowEdit]=useState(false)
    const handleClick = async () => {
        if (!user) {
          return
        }
        const imageRef = ref(storage, track.imageURL)
        deleteObject(imageRef).then(() => {
          console.log('File deleted successfully')
        }).catch((error) => {
          console.log(error)
        })
        const audioRef = ref(storage, track.audioURL)
        deleteObject(audioRef).then(() => {
          console.log('File deleted successfully')
        }).catch((error) => {
          console.log(error)
        })
        const response = await fetch('/api/tracks/' + track._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({ type: 'DELETE_TRACK', payload: json })
        }
    
      }
    
   return(
    <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm   hover:bg-gray-50">
        <Icon path={mdiDotsVertical} size={0.7} />
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
                onClick={
                    setSHowEdit(true)
                }
              >
               Edit
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
              onClick={handleClick}
                href="#"
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
                Delete
              </a>
            )}
          </Menu.Item>
          {showEdit&&<EditTrackForm track={track}></EditTrackForm>}
       
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
   )

}
export default ThreeDotsDropDown