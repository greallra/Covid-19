import React from 'react';
import World from './Components/World';
import Countries from './Components/Countries/Countries';
import Nav from './Components/Nav/Nav';
import './App.css';
import './demo.css';
import ReactGA from 'react-ga';

const iframe = '<iframe src="https://corona19-stats.netlify.com/" id="iframe" border-width="10px"></iframe>'; 

class App extends React.Component{
  componentDidMount(){
    
   
  }
 

  render() {
    ReactGA.initialize('UA-129457674-4');
ReactGA.pageview(window.location.pathname + window.location.search);
    return (
      <div className="App">
        <Nav></Nav>
       
        <World iframe={iframe}/>

        <Countries /> 
             
      </div>
    );
  }
}

export default App;
