import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import RegistroPage from './components/RegistroPage';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registro" element={<RegistroPage />} />
        </Routes>
      </main>
    </BrowserRouter>    
  );
}

export default App;