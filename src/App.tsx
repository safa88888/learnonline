import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview3D from './components/Preview3D';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Preview3D />} />
      </Routes>
    </Router>
  );
}

export default App;
