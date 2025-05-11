import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { Pedicure } from './pages/Pedicure.tsx';
import { Manicure } from './pages/Manicure.tsx';
import { Book } from './pages/Book.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pedicure" element={<Pedicure />} />
        <Route path="/manicure" element={<Manicure />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  </StrictMode>
);