import React from 'react';
import '../App.css';
//import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


function Goals() {
    
    const cookies = new Cookies();
    const email = cookies.get('email');
    console.log(email);
    const [data, setData] = useState({
        email: email,
        addAssignment: '',
        addGoal: ''
      });
    
    const [goals, setGoals] = useState({});
    useEffect(() => {axios
    .post('http://localhost:8000/api/goals', data)
    .then((res) => {
        setGoals(res.data.goals);
        console.log(goals, "hereherehere");
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
         axios.post('http://localhost:8000/api/add-goal', data)
        .then((res) => {
            console.log(res.data.goals, "here");
            setGoals(res.data.goals);
        })
        .catch(err => {
          console.error(err);
    });
        
    }



    return ( 
        <div id="course_list" className="course_list">
         <body>
            <h2 id="title">Goals</h2>
            <div className="form3" id="form3">
            { goals ? <form className="form3" id="form3">
                {Object.keys(goals).map(goal => ( [
                     <input id="goal" class="goal" type="submit" value={goal}/>,
                     <input id="goal" class="goal" type="submit" value={goals[goal]}/> 
                ]
            ))}
            </form> : null }
            <form className="add-form" id="add-form" onSubmit={(e) => handleClick(e)}>
                <input type="text" onChange={(e) => handleInput(e)} className="addAssignment" name="addAssignment" value={data.addAssignment} id="addAssignment" placeholder="Enter assignment"/> 
                <input type="text" onChange={(e) => handleInput(e)} className="addGoal" name="addGoal" value={data.addGoal} id="addGoal" placeholder="Enter goal"/> 
                <input id="addGoal" className="addGoal" type="submit" value="Add Goal"/> 
            </form>
           
            </div>
            </body>
        </div>
      );
}

export default Goals;