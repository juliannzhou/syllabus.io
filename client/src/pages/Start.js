import '../App.css';
import FileUpload from './utils/FileUpload';
import React from 'react';

function Start() {
    return ( 
        <div id="start" className="start">
          <body>
            <div>
            <h2 id="upload">upload</h2>
            <FileUpload/>
            </div>
          </body>
        </div>
      );
}

export default Start;