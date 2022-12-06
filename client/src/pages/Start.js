import '../App.css';
import FileUpload from './utils/FileUpload';

function Start() {
    return ( 
        <div id="start" className="start">
          <body>
            <h2 id="upload">upload</h2>
            <FileUpload/>
          </body>
        </div>
      );
}

export default Start;