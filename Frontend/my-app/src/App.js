
import './App.css';

import React from "react"
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';
import Client from './components/Client';
import Conversation from './components/conversation'

function App() {
  return (
    <React.Fragment>
    <NavBar/>
    
    <Routes>
    <Route path="/" exact element={<Home/>}/>
    <Route exact path="/client" element={<Client/>}/>
    <Route path="/conversation/:id/" element={<Conversation/>}/>
    </Routes>
    </React.Fragment>
  );
}

export default App;
