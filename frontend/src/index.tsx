import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage.tsx';
import PrivateRoute from './components/PrivateRoute';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello, World!</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/products/:id/view"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
