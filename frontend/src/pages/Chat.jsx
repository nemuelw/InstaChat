import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {
  const {username, room} = useParams()
  const [messages, setMessages] = useState([
    {
        username: 'user1',
        message: 'hola friend'
    },
    {
        username: 'user3',
        message: 'hello friend'
    },
    {
        username: 'admin',
        message: 'hello friend'
    }
  ])
  const [userList, setUserList] = useState(['user1', 'user2'])
  const [message, setMessage] = useState('')
  const socket = io.connect('http://localhost:1234')

  const handleSendMessage = (e) => {
    e.preventDefault()
    alert(message)
  }

  useEffect(() => {
    socket.on('newMessage', ({message, username}) => {
        setMessages([...messages, {message, username}])
    })

    socket.on('userList', ({users}) => {
        setUserList(users)
    })
  }, [messages,userList])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='p-5 rounded-md border border-blue-900 h-[500px] w-1/2 flex shadow-2xl'>
        <div className='w-[40%] bg-green-500 p-5 rounded-md text-center relative'>
            <p className='text-green bg-white p-3 rounded-lg'>Active Users</p>
            <ul className='mt-2 text-white absolute right-3 px-4 py-2 overflow-y-auto'>
                {
                    userList.map((user) => {
                        return (
                            <>
                                <li className='text-xl'>{user}</li>
                                <hr />
                            </>
                        )
                    })
                }
            </ul>
            <button
                className='bg-red-700 absolute bottom-3 left-3 text-white p-3 rounded-lg w-[90%]'
            >
                Leave
            </button>
        </div>
        <div className='w-[60%] border border-green-500 ml-3 rounded-md p-5 relative flex flex-col h-full'>
            <div className="p-3 overflow-y-auto border border-blue-900 relative flex-1 mb-10 rounded-lg flex flex-col">
                {
                    messages.map((message, index) => (
                        message.username === username ?
                        (
                            <div key={index} className='absolute right-3 p-2 bg-gray-500 rounded-md text-white'>
                                <label className='text-xs'>You</label>
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        ) : (
                            <div key={index} className='absolute left-3 p-2 bg-gray-500 rounded-md text-white mb-2'>
                                <label className='text-xs'>{message.username}</label>
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        )
                    ))
                }
            </div>
            <form className='flex absolute bottom-2 items-center' onSubmit={handleSendMessage}>
                <input 
                    type="text"
                    className='border border-blue-900 rounded-lg focus:outline-none p-2'
                    placeholder='Type your message ...'
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type='submit'
                >
                    <FontAwesomeIcon 
                        icon={faPaperPlane}
                        className='ml-3 border border-blue-900 p-3 rounded-2xl'
                    />
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Chat
