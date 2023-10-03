import {Routes, Route} from 'react-router-dom'
import Join from './pages/Join'
import Chat from './pages/Chat'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Join /> } />
        <Route path='/chat' element={ <Chat /> } />
      </Routes>
    </div>
  );
}

export default App;
