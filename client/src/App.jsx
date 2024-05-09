import React from 'react'
import {io} from 'socket.io-client'
import './App.css'

function App() {
  const socket = React.useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  )
  const [sendMsg, setSendMsg] = React.useState('')
  const [receivedMsg, setReceivedMsg] = React.useState('')
  const [socketId, setSocketId] = React.useState('')
  const [userId, setUserId] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    socket.emit('message', {msg: sendMsg, id: userId})
    socket.on('received-msg', (msg) => {
      setReceivedMsg(msg)
    })
    setSendMsg('')
    setUserId('')
  }

  React.useEffect(() => {
    const socket = io('http://localhost:3000')
    socket.on('connect', () => {
      setSocketId(socket.id)
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  return (
    <>
    <div className="msg-box">
      <h1>No-More-LoneWolf</h1>
      <form action="">
        <div className="inp1">
          <label htmlFor="msg">Message : </label>
          <input type="text" name="msg" id="msg" value={sendMsg} onChange={(e) => setSendMsg(e.target.value)} placeholder="Enter your message" />  
        </div>
        <div className="inp1">
          <label htmlFor="id">To (U-id) : </label>
          <input type="text" name="id" id="id" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter user id" />  
        </div>
        <button type="submit" onClick={handleSubmit} >Send ↗️</button>
      </form>
    </div>
    </>
  )
}

export default App
