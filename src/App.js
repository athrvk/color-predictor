import React from 'react';
import './App.css';
import MyColor from './components/ColorScheme';



function App() {
  return (
    <div className="App">
      <br></br>

      <h2>Choose a color according to what you're feeling now!</h2>
      <button className="btn-info border-0 rounded" onClick={()=>{window.location.reload(false)}}>Reset!</button>
      <hr></hr>
      
      <MyColor />
    </div>
  );
}

export default App;
