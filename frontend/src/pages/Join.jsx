import React, { useState } from 'react'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

const Join = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const socket = io.connect('http://localhost:1234')

  const handleJoinRoom = (e) => {
    e.preventDefault()
    socket.emit('join', {username})
  }

  socket.on('joinSuccess', () => {
    sessionStorage.setItem('username', username)
    navigate('/chat')
  })

  socket.on('usernameError', () => {
    setError('Username has already been picked')
  })

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-purple-500 rounded-md p-3 text-white text-center w-1/3'>
        <p className='mb-3 text-2xl'>InstaChat</p>
        <p className='text-sm text-red'>{error}</p>
        <form className='w-full' onSubmit={handleJoinRoom}>
          <input 
            type="text"
            className='w-full p-3 rounded-lg text-black mb-5 focus:outline-none'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type='submit'
            value='Join Chat'
            className='w-full rounded-lg mb-5 bg-blue-700 py-4'
          />
        </form>
      </div>
    </div>
  )
}

export default Join
