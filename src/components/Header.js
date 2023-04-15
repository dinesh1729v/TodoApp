import React, { useEffect, useState } from "react";
import "./homepage.css";
class Header extends React.Component {
    render() {
      return (
        <div>
        <div style={{ textAlign: 'left' }}>

           
            <img style={{ margin: '20' }} class="titleImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCQ0D6KL2xS4HFBaiynsVVAVFO-SMAGW0pg&usqp=CAU" width="200" height="100" alt="My Image" />
        
        </div>
        <h1 style={{ fontSize: 40, fontStyle: 'italic', textAlign: 'center' }}>DAILY DIARY</h1>
      </div>    
      );
    }
  }
  
  export default Header;