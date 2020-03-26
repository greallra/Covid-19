import React from 'react';
import './Nav.css';
import globe from '../../globe.png';


export default class Nav extends React.Component {
    render() {
      return <div className="nav-cont">
          <div>Covid 19</div>
          <img src={globe} id="globe"/>
      </div>;
    }
  }
  


  