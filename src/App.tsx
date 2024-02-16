import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import {Routes, Route} from "react-router-dom";  //  Routes для перемещениям между страницами в рамках SPA приложения
import ProjectPage from './Project/ProjectPage';
import Layout from './Layout'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='project' element={<ProjectPage />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
