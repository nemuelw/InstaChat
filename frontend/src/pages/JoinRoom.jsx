import React, { useState } from 'react'

const JoinRoom = () => {
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('')
  const [room, setRoom] = useState('')

  const handleUsername = async(username) => {

  }

  const handleJoinRoom = async(e) => {
    e.preventDefault();
    
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-purple-900 rounded-md p-3 text-white text-center w-1/3'>
        <p className='mb-3 text-2xl'>InstaChat</p>
        <form className='w-full' onSubmit={handleJoinRoom}>
          <input 
            type="text"
            className='w-full p-3 rounded-lg text-black mb-5'
            placeholder='Username'
            onChange={(e) => handleUsername(e.target.value)}
            required
          />
          <select
            className='w-full px-3 py-4 rounded-lg text-black mb-5'
            required
          >
            <option>Select Room</option>
            <option value='room_1'>Room 1</option>
            <option value='room_2'>Room 2</option>
            <option value='room_3'>Room 3</option>
            <option value='room_4'>Room 4</option>
            <option value='room_5'>Room 5</option>
          </select>

          <input 
            type='submit'
            value='Join Chatroom'
            className='w-full rounded-lg mb-5 bg-blue-700 py-4'
          />
        </form>
      </div>
    </div>
  )
}

export default JoinRoom
