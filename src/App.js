// import logo from './logo.svg';
// import './App.css';
// import DomainList from './components/DomainList';

// function App() {
//   return (
//     <div className="App">
//       <DomainList></DomainList>
//     </div>
//   );
// }

// export default App;
// App.js

import React from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import DomainList from './components/DomainList';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/domainlist" element={<DomainList />} />
        <Route path="/courses/:courseId/students" element={<StudentList/>} />
        </Routes>      
    </Router>
  );
};

export default App;
