import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import SignUp from './components/signup/signUp';
import Main from './components/main/main';
import Login from './components/login/login';
import Feed from './components/feed/feed';
import Experience from './components/experience/experience';
import { Console } from 'console';

const App = () =>  {
  const [name, setName] = useState('');

  console.log('rendered');

  const updateUser = (name : string) => {
    setName(name);
  }

  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home name={name}/>} />
              <Route path="/signup"  element={<SignUp name={name} updateUser={updateUser}/>} />
              <Route path="/main" element={<Main name={name}/>} />
              <Route path="/login" element={<Login name={name}/>} />
              <Route path="/experience" element={<Experience/>} />
              <Route path='/feed' element={<Feed myPost={false}/>} />
              <Route path='/myposts' element={<Feed myPost={true}/>} />
          </Routes>   
    </BrowserRouter>
  );
}

export default App;
