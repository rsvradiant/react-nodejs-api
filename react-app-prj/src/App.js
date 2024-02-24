import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { HealthTopics } from './components/HealthTopics'
import { getHealthTopics} from './services/HealthService'

function App() {

  const [topics, setTopics] = useState([])

  useEffect(() => {
    getHealthTopics()
      .then(topics => {
        setTopics(topics);
      });
  }, []) 
    
  return (
      <div className="App">
        <Header></Header>          
        <div className="row mrgnbtm">
          <HealthTopics topics={topics}></HealthTopics>
        </div>
      </div>
  );
}

export default App;
