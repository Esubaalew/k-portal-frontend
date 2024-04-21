import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
      <footer className="Footer">
        <p>@2024 Programming Portal. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </nav>
      </footer>
    );
  }
  
  export default Footer;