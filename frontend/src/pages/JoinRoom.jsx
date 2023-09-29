import React, { useState } from 'react'

const JoinRoom = () => {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const handleJoinRoom = (e) => {
    e.preventDefault()
    console.log(username, room)
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-purple-900 rounded-md p-3 text-white text-center w-1/3'>
        <p className='mb-3 text-2xl'>InstaChat</p>
        <form className='w-full' onSubmit={handleJoinRoom}>
          <input 
            type="text"
            className='w-full p-3 rounded-lg text-black mb-5 focus:outline-none'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <select
            className='w-full px-3 py-4 rounded-lg text-black mb-5'
            onChange={(e) => setRoom(e.target.value)}
            required
          >
            <option value=''>Select Room to Join</option>
            <option value='room_1'>Room 1</option>
            <option value='room_2'>Room 2</option>
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
