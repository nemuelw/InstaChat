import {Routes, Route} from 'react-router-dom'
import JoinRoom from './pages/JoinRoom'
import Chat from './pages/Chat'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <JoinRoom /> } />
        <Route path='/chat/:username/:room' element={ <Chat /> } />
      </Routes>
    </div>
  );
}

export default App;
