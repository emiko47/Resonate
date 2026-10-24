import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssfiles/index.css';
import Home from './Navbar';
import Navbar from './Navbar';
import ExploreMusic from './ExploreMusic';
import Communities from './Communities';
import Events from './Events';
import MyCollections from './MyCollections';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id='fullPage'>
        <Navbar />
        <div id='sideBar_and_routeContainer'>
          <div id='sideBar'>
            <div className='sideBarItems'><p>Explore Music</p></div>
            <div className='sideBarItems'><p>Communities</p></div>
            <div className='sideBarItems'><p>Events</p></div>
            <div className='sideBarItems'><p>My Collections</p></div>

          </div>
          <div id='routeContainer'>  
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exploremusic" element={<ExploreMusic />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/events" element={<Events />} />
              <Route path="/mycollections" element={<MyCollections />} />
            </Routes>
          </div>
        </div>
      </div>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

