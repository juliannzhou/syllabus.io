import './App.css';
import React, { useEffect, useState } from 'react';
import Main from './Main.js';

function App() {
  const [backendData, setBackendData] = useState();

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
     );
  }, []);
  console.log(backendData);
  return (
    <div className="App">
      <Main/>
    </div>
  );
    
}

export default App;
