import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
  } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import CoursePage from './pages/CoursePage';
import Schedule from './pages/Schedule';
import Goals from './pages/Goals';

const Main = () => {
  return (
    <BrowserRouter>
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route index element={<Home/>}></Route>
      <Route exact path='/signup' element={<Signup/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/start' element={<Start/>}></Route>
      <Route exact path='/dashboard' element={<Dashboard/>}></Route>
      <Route exact path='/course' element={<Course/>}></Route>
      <Route exact path='/course-page' element={<CoursePage/>}></Route>
      <Route exact path='/schedule' element={<Schedule/>}></Route>
      <Route exact path='/goals' element={<Goals/>}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default Main;