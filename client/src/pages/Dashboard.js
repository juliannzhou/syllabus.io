import '../App.css';
import { Link } from 'react-router-dom';
import course from '../img/course.svg';
import schedule from '../img/schedule.svg';
import goals from '../img/goals.svg';


function Dashboard() {
    return ( 
        <div id="dashboard" className="dashboard">
          <body>
            <h1 id="title">user dashboard</h1>
            <form>
                <div>
                <Link className="btn" to="/Course"> 
                <input id="Course" class="Course" type="image" src={course}/> 
                </Link>
                <h2 className="text-align">course</h2>
                </div>
                <div>
                <Link className="btn" to="/Login"> 
                <input id="Schedule" class="Schedule" type="image" src={schedule}/> 
                </Link>
                <h2 className="text-align">schedule</h2>
                </div>
                <div>
                <Link className="btn" to="/Login"> 
                <input id="Goals" class="Goals" type="image" src={goals}/>
                </Link>
                <h2 className="text-align">goals</h2> 
                </div>
            </form>
          </body>
        </div>
      );
}

export default Dashboard;