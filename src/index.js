import React from "react";
import ReactDOM from "react-dom/client";
import "./cssfiles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import ExploreMusic from "./ExploreMusic";
import Communities from "./Communities";
import CreateCommunity from "./CreateCommunity";
import Community from "./InCommunity";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Events from "./Events";
import MyCollections from "./MyCollections";
import Chat from "./Chat";
import Search from "./Search";
import Profile from "./Profile";
import AccountAccess from "./AccountAccess";
import { DemoAuthProvider } from "./DemoAuth";
import "./cssfiles/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DemoAuthProvider>
        <Routes>
          <Route path="login" element={<AccountAccess />} />
          <Route path="signup" element={<AccountAccess signup />} />
          <Route element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="exploremusic" element={<ExploreMusic />} />
            <Route path="communities">
              <Route index element={<Communities />} />
              <Route path=":communityId">
                <Route index element={<Community />} />
                <Route path=":postId" element={<Post />} />
              </Route>
            </Route>
            <Route path="createcommunity" element={<CreateCommunity />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="events" element={<Events />} />
            <Route path="mycollections" element={<MyCollections />} />
            <Route path="chat" element={<Chat />} />
            <Route path="search" element={<Search />} />
            <Route path="myprofile" element={<Profile />} />
          </Route>
        </Routes>
      </DemoAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
