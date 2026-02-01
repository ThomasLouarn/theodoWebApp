import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Error404Page from './pages/Error404Page.tsx';
import Favorites from './pages/Favorites.tsx';
import HomePage from './pages/HomePage.tsx';
import Navbar from './pages/Navbar.tsx';
import Recette from './pages/Recette.tsx';

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
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
