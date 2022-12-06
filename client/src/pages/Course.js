import '../App.css';
import { useNavigate } from 'react-router-dom';


function Course() {
    const navigate = useNavigate();
    const current = 1;
    
    function handleClick() {
        navigate('/start');
    }

    return ( 
        <div id="course_page" className="course_page">
         <body>
            <h2 id="title">Course</h2>
            <div class="form">
                <form>
                <input type="submit" onClick={()=>handleClick()} className="course" id={"course"+current} value="Add course"/> 
                </form>
            </div>
            </body>
        </div>
      );
}

export default Course;