import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/tailwind.css';

import Chat from './components/Chat';
import Join from './components/Join';

const App = () => (
  <div className='flex w-screen h-screen bg-gray-400'>
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/chat' exact component={Chat} />
    </Router>
  </div>
);

export default App;
