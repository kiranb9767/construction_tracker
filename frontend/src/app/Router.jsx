import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import SiteDetailsPage from '../pages/SiteDetailsPage';

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={DashboardPage} />
            <Route path='/site/:siteId' Component={SiteDetailsPage} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router