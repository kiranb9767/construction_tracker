import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import SiteDetailsPage from '../pages/SiteDetailsPage';
import Login from '../pages/LoginPage';
import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
              <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/site/:siteId" element={
              <ProtectedRoute>
                <SiteDetailsPage />
              </ProtectedRoute>
            } />
        </Routes>
    </BrowserRouter>
  )
}

export default Router