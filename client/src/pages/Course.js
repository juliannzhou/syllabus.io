import React from 'react';
import '../App.css';
//import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


function Course() {
    const navigate = useNavigate();
    
    const cookies = new Cookies();
     const [data, setData] = useState({
        email: cookies.get('email'),
        addName: '',
      });
    
    const [courseDict, setCourseDict] = useState({});
    useEffect(() => {axios
    .post('http://localhost:8000/api/course', data)
    .then((res) => {
        setCourseDict(res.data.course);
        console.log(courseDict, "hereherehere");
     })
    .catch(err => {
    console.error(err);
    });}, []);
        

    function handleInput(e) {
        const newData={...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function handleClick() {
         axios.post('http://localhost:8000/api/add-course', data)
        .then((res) => {
            console.log(res.data.course, "here");
            setCourseDict(res.data.course);
        })
        .catch(err => {
          console.error(err);
    });
        
    }

    function handleCourse(e) {
        const cookies = new Cookies();
        const courseName = e.target.value;
        const path = courseDict[courseName]['syllabus'];
        cookies.set("courseName", courseName);
        console.log(e.target.value);
        console.log(courseDict[courseName]);
        if (path === '') {
            navigate('/start');
        }
        else {
            cookies.set("syllabus", path);
            navigate('/course-page');
        }
        
    }

    return ( 
        <div id="course_list" className="course_list">
         <body>
            <h2 id="title">Course</h2>
            <div>
            { courseDict ? <form className="form1" id="form1">
                {Object.keys(courseDict).map(course => (
                    <div>
                    <input onClick={handleCourse} id="course" class="course" type="submit" value={course}/> 
                    </div>
            ))}
            </form> : null }
            <form className="add-form" id="add-form"onSubmit={(e) => handleClick(e)}>
                <input type="text" onChange={(e) => handleInput(e)} className="addName" name="addName" value={data.addName} id="addName" placeholder="Enter course name"/> 
                <input id="addCourse" className="addCourse" type="submit" value="Add Course"/> 
            </form>
           
            </div>
            </body>
        </div>
      );
}

export default Course;