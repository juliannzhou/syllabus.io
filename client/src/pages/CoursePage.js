import Cookies from 'universal-cookie';
import syllabus from '../img/syllabus.svg';

function CoursePage() {

    
    const cookies = new Cookies();
    const courseName = cookies.get('courseName');
    

    function handleClick(e) {
        e.preventDefault();
        const location = cookies.get('syllabus');
        console.log(location);
        window.location.href=location;
    }

    return ( 
        <div id="course_page" className="course_page">
         <body>
            <h2 id="title">{courseName}</h2>
            <div className="form1" id="form1">
            <form onSubmit={handleClick}>
                <div>
                    <input id="Course" class="Course" type="image" src={syllabus}/> 
                </div>
            </form>
            </div>
            </body>
        </div>
      );
}

export default CoursePage;