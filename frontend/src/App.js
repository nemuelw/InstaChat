import {Routes, Route} from 'react-router-dom'
import JoinRoom from './pages/JoinRoom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <JoinRoom /> } />
      </Routes>
    </div>
  );
}

export default App;
