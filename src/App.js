import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserContext from '../src/userContext';
import ListUser from './ListUsers';
import ViewUser from './ViewUser';
import useData from '../src/mockup';

import '../src/custom.scss';

function App() {
  console.log(useData)
  return (
    <UserContext.Provider value={useData}>
      <div className="App">
        <header className="App-header">
           Welcome to the Challenge
        </header>
      </div>
      <Router>
      <Routes>
        <Route exact path="/" element={<ListUser />}></Route>
        <Route path="/user/:id" element={<ViewUser />}></Route>
      </Routes>
      </Router>
      
    </UserContext.Provider>
    
  );
}

export default App;
