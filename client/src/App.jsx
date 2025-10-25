import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/login/Login.jsx';
import DashboardLayout from "./components/dashboard/DashboardLayout"
import PanelPage from "./components/dashboard/PanelPage"
import PacientPage from "./components/dashboard/PacientPage"
import RegistroPage from './components/RegistroPage';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<PanelPage />} />
            <Route path="pacientes" element={<PacientPage />} />
            <Route path="analisis" element={<div>Analisis</div>} />
        </Route>
        </Routes>
      </main>
    </BrowserRouter>    
  );
}

export default App;