import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import About from "./components/About/About"
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import TitleBar from './components/TitleBar/TitleBar';

class App extends React.Component {
  render() {
    return (
      <Router>
        <TitleBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
