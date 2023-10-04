import {Routes, Route} from 'react-router-dom'
import dotenv from 'dotenv'
import Join from './pages/Join'
import Chat from './pages/Chat'

dotenv.config()

const serverUrl = process.env.SERVER_URL

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Join serverUrl={serverUrl} /> } />
        <Route path='/chat' element={ <Chat serverUrl={serverUrl} /> } />
      </Routes>
    </div>
  );
}

export default App;
