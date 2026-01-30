import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Navbar from './pages/Navbar.tsx';
import Recette from './pages/Recette.tsx';
import HomePage from './pages/HomePage.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="recettes/:recetteId" element={<Recette />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
