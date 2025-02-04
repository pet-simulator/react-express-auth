import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import PetPage from './pages/PetPage';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return (
    <div className="App">
      <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/users/:id' element={<UserPage />} />
          <Route path='/pets/:id' element={<PetPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}


