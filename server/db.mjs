//An Example User:

// ```javascript
// {
//   "username": "workhardplayhard123",
//   "_id": ObjectId("5af712eff26b29dc5c51c60f"),
//   "hash": // a password hash,
//   "syllabi": // an array of uploaded syllabi
//   "course_name": // an array of course names
// }
// ```

// //An Example Course with Embedded Deadlines:

// ```javascript
// {
//   "user": // a reference to a User object
//   "name": "Applied Internet Technology",
//   "basic_info": {"instructor": "Joseph Versoza", 
//   "course_number": "CSCI-UA.0467", 
//   "topics": ['javascript', 'Server Side Programming (with Node and Express)', '...']}
//   "deadlines": [
//     { "name": "Quizzes #1 and #2", "due": "2022-09-14"},
//     { "name": "Homework #1", "due": "2022-09-23"},
//   ],
//   "grading": {
//       "Homework": { "bsonType": "number" }, 
//       "Exam_1": { "bsonType": "number" }, 
//       "Exam_2": { "bsonType": "number" },
//       "Quizzes": { "bsonType": "number" },
//       "In-Class_Activities": { "bsonType": "number" },
//       "Final Project": { "bsonType": "number" }
// }
// ```

// is the environment variable, NODE_ENV, set to PRODUCTION? 
import fs from 'fs';
import path from 'path';
import url from 'url';
import mongoose from 'mongoose';


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
// if we're in PRODUCTION mode, then read the configration from a file
// use blocking file io to do this...
const fn = path.join(__dirname, 'config.json');
const data = fs.readFileSync(fn);

// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
const conf = JSON.parse(data);
dbconf = conf.dbconf;
} else {
// if we're not in PRODUCTION mode, then use
dbconf = 'mongodb://127.0.0.1/User';
}
console.log(dbconf)
const UserSchema = new mongoose.Schema({
    email: String,
    password: {type: String, unique: true, required: true},
    id: mongoose.Schema.Types.ObjectId,
    course: { type : Array , "default" : [] }
});
mongoose.connect(dbconf);
const User = mongoose.model('User', UserSchema);

export default User;
