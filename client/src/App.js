import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatarPage from './pages/SetAvatarPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route exact path='register' element={<Register />} />
        <Route exact path='login' element={<Login />} />
        <Route exact path='setAvatar' element={<SetAvatarPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App