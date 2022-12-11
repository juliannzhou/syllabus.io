import '../../App.css';
import React from 'react';
import axios from 'axios';
import icon from '../../img/upload.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

axios.defaults.withCredentials = true;

  
  
  // drag drop file component
  function FileUpload() {
    const navigate = useNavigate();
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    
    function handleFile(files) {
        if (files.length !== 1) {
          alert("Please upload one file only");
        }
        else {
          alert("Upload success");
          console.log(files);
        console.log(files[0].name);
        const formData = new FormData();
        const cookies = new Cookies();
        const courseName = cookies.get("courseName");
        const email = cookies.get("email");
        formData.append('user_syllabus', files[0]);
        formData.append('courseName', courseName);
        formData.append('email', email);
        axios.post("http://localhost:8000/api/user-profile", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
        }).then(res => {
            if (res['data']['message'] === 'success') {
                navigate('/course');
            }
        });
    }
    
        
    
    }
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files);
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      inputRef.current.click();
    };
    
    return (
      <form id="form-file-upload" class="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input className="input1" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <img src={icon} alt="upload icon" id="ui" className="ui"></img>
            <p>drag & drop your file here or</p>
            <input id="Upload" onClick={onButtonClick} className="Upload" type="submit" value="Upload"/> 
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>

    );
  }

  export default FileUpload;