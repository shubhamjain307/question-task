import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './forms/FormPage';
import ReviewPage from './forms/ReviewPage';

const App = () => (
  <Router>
    <Routes>
      {/* Route for the main form page */}
      <Route exact path="/" element={ <FormPage/>} />
      
      {/* Route for the review answers page */}
      <Route path="/review" element={ <ReviewPage/>} />
    </Routes>
  </Router>
);

export default App;

