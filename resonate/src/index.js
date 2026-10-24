import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssfiles/index.css';
import Home from './Home';
import ExploreMusic from './ExploreMusic';
import Communities from './Communities';
import Events from './Events';
import MyCollections from './MyCollections';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploremusic" element={<ExploreMusic />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/mycollections" element={<MyCollections />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

