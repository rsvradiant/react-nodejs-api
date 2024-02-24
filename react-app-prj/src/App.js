import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { HealthTopics } from './components/HealthTopics'
import { getHealthTopics } from './services/HealthService'
import { RotatingTriangles } from "react-loader-spinner";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([])
  const loaderStyle = {
    width: '100%',
    height: '100%',
    padding: '2%',
    color: 'white',
    textAlign: 'center'
  }

  useEffect(() => {
    setIsLoading(true);
    getHealthTopics()
      .then(topics => {
        setIsLoading(false);
        setTopics(topics);
      });
    
  }, []) 
    
  return (
      <div className="App">
        <Header></Header>          
        <div className="row mrgnbtm">
        {isLoading && <div style={loaderStyle}>
        <RotatingTriangles visible={isLoading}
          marginTop="50%"
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rotating-triangles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
          </div>
        
        }
        {!isLoading && <HealthTopics topics={topics}></HealthTopics>}
          
        </div>
      </div>
  );
}

export default App;
