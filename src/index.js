import React from 'react';
import ReactDOM from 'react-dom/client';
import './cssfiles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ExploreMusic from './ExploreMusic';
import Communities from './Communities';
import { Community } from './Community';
import Events from './Events';
import MyCollections from './MyCollections';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='exploremusic' element={<ExploreMusic />} />
          <Route path='communities'>
            <Route index element={<Communities />}/>
            <Route path=':communityId' element={<Community />}/>
          </Route>
          <Route path='events' element={<Events />} />
          <Route path='mycollections' element={<MyCollections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

