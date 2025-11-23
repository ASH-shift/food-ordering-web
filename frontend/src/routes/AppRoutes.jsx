import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/general/Home';
import CreateFood from '../pages/foodpartner/CreateFoodPartner';
import Profile from '../pages/foodpartner/Profile';
import Saved from '../pages/general/Saved';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home/>} />
        <Route path="/create-food" element={<CreateFood/>} />
        <Route path='/foodpartner/:id' element={<Profile/>} />
        <Route path='/saved' element={<Saved/>} />
      
      </Routes>
    </Router>
  )
}

export default AppRoutes