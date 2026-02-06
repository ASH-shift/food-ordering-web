import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/general/Home';
import CreateFood from '../pages/foodpartner/CreateFoodPartner';
import Profile from '../pages/foodpartner/Profile';
import Saved from '../pages/general/Saved';
import Meals from "../pages/general/Meals";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Default page → Register */}
        <Route path="/" element={<Navigate to="/user/register" />} />

        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />

        <Route path="/home" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path='/foodpartner/:id' element={<Profile />} />
        <Route path='/saved' element={<Saved />} />
        <Route path="/meals" element={<Meals />} />

      </Routes>
    </Router>
  )
}

export default AppRoutes;
