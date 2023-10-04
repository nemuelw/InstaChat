import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {
  const username = sessionStorage.getItem('username')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const socket = io.connect('http://localhost:1234')

  const handleSendMessage = (e) => {
    e.preventDefault()
    socket.emit('chatMessage', {message, username})
    setMessage('')
  }

  const handleLeaveRoom = () => {
    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    console.log('Users updated:', users)
  }, [users])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Client connected')
    })
  }, [socket])

  useEffect(() => {
    socket.on('newMessage', ({message, username}) => {
      setMessages([...messages, {message,username}])
    })
  }, [socket, messages])

  useEffect(() => {
    socket.on('userList', ({users}) => {
      console.log(users)
      setUsers(users)
    })
  }, [socket, users])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='p-5 rounded-md border border-blue-900 h-[500px] w-1/2 flex shadow-2xl'>
        <div className='w-[40%] bg-purple-500 p-5 rounded-md text-center relative'>
            <p className='text-green bg-white p-3 rounded-lg'>Active Users</p>
            <ul className='mt-2 text-white absolute right-3 px-4 py-2 overflow-y-auto border-l'>
                {
                    users.length > 0 ?
                    users.map((user, index) => {
                        return (
                            <>
                                <li key={index} className='text-xl'>{user === username ? `${user}(You)` : user}</li>
                                <hr />
                            </>
                        )
                    }) :
                    'None'
                }
            </ul>
            <button
                onClick={handleLeaveRoom}
                className='bg-red-700 absolute bottom-3 left-3 text-white p-3 rounded-lg w-[90%]'
            >
                Leave
            </button>
        </div>
        <div className='w-[60%] border border-purple-900 ml-3 rounded-md p-5 relative flex flex-col h-full'>
            <div className="overflow-y-auto border border-purple-900 relative flex-1 mb-10 rounded-lg">
            {
                messages.map((message, index) => (
                <div
                    key={index}
                    className={`m-2 p-2 w-[60%] rounded-md ${
                    message.username === username ? 'bg-gray-500 text-white ml-[38%]' : 'bg-gray-300 text-black'
                    }`}
                >
                    <label className='text-xs'>{message.username === username ? 'You' : message.username}</label>
                    <p>{message.message}</p>
                </div>
                ))
            }
            </div>
            <form className='flex absolute bottom-2 items-center' onSubmit={handleSendMessage}>
                <input 
                    type="text"
                    className='border border-purple-900 rounded-lg focus:outline-none p-2'
                    placeholder='Type your message ...'
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type='submit'
                >
                    <FontAwesomeIcon 
                        icon={faPaperPlane}
                        className='ml-3 border border-purple-900 p-3 rounded-2xl'
                    />
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
