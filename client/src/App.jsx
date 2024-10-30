import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Search from './components/Search';
import DisplayDisease from "./components/DisplayDesease";
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/disease" element={<DisplayDisease />} />
          {/* You can add a default route or a 404 page here */}
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
