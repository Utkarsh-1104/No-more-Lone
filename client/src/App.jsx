import {io} from 'socket.io-client'
import './App.css'

function App() {
  const socket = io('http://localhost:3000')
  return (
    <>
      <h1>Hello world</h1>
    </>
  )
}

export default App
