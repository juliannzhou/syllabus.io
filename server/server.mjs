import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './db.mjs';
import path from 'path';
import url from 'url';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import router from './routes/user.routes.mjs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 600000,
        secure: true
      },
    resave: false,
    saveUninitialized: true,
}))
app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization", 'set-cookie'], // you can change the headers
      credentials: true,
      origin: 'http://localhost:3000',
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );
  app.options({
    origin: true,
  credentials: true,
  })
  app.use('/public', express.static('public'));
  app.use('/api', router)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: false
  }));
  // make {{user}} variable available for all paths
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
  });
  
  // logging
  app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  const signup = (email, password, successCallback, errorCallback) => {
    // TODO: implement register
    if (password.length < 8) {
      errorCallback('PASSWORD TOO SHORT');
    }
    User.findOne({'email': email}, function(err, result) {
      console.log(result);
      if (result === null) {
        const hash = bcrypt.hash(password, 10, function(err, hash) {
          // do more stuff here!
            if (err) {
              console.log(err);
              errorCallback({message: 'PASSWORD HASH FAILED'})
            }
            const newUser = new User({
              email: email,
              password: hash 
            });
            newUser.save(function(err, user, count) {
              if (err) {
                errorCallback('DOCUMENT SAVE ERROR')
              }
              successCallback(user);

            });
        });
        
      }
      else {
        errorCallback('EMAIL ALREADY EXISTS');
      }
    })
    User.findOne({'email': email});
  };



const login = (email, password, successCallback, errorCallback) => {
    // TODO: implement login

    const user = User.findOne({'email': email}, function (err, user) {
        console.log(err,user)
        if (err) {
            console.log(err);
            errorCallback('USER SEARCH FAILED')
          }
          else {
            if (user === null) {
              errorCallback('USER NOT FOUND');
            }
            else {
              bcrypt.compare(password, user.password, (err, passwordMatch) => {
                if (err) {
                  console.log(err);
                  errorCallback("PASSWORD CHECK FAILED")
                }
                else {
                  if (passwordMatch) {
                    successCallback(user);
                  }
                  else {
                    errorCallback("PASSWORDS DO NOT MATCH");
                  }
                }
                
              });
            }
          }
    });


};




const startAuthenticatedSession = (req, user, cb) => {
    // TODO: implement startAuthenticatedSession
        console.log('starting new authenticated session', user);
        req.session.regenerate(function(err) {
            if (err) {
            // set a property on req.session that represents the user
                console.log(user, 'aaa')
                req.session.cookie.user = user;
                console.log(req.session);
                cb(err);

            } else {
            // call callback with error
                cb(err);
            }
        })
    };

const endAuthenticatedSession = (req, cb) => {
// TODO: implement endAuthenticatedSession
    req.session.destroy((err) => { cb(err); });
};



app.get("/api", (req, res) => {
    res.json({"user": ["userOne", "userTwo", "userThree"]})
})


app.post("/api/signup/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  function success(newUser) {
    startAuthenticatedSession(req, newUser, (err) => {
        if (!err) {
             res.send({key:'success'});
        } else {
            res.render('error', {message: 'err authing???'}); 
        }
    });
  }

  if (password != cpassword) {
      console.log('Password do not match!');
  }
  else {

    signup(email, password, success, (e) => console.log(e));
  }
})

app.post("/api/login/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)// assumes that User was registered in `./db.mjs`

    function success(newUser) {
        startAuthenticatedSession(req, newUser, (err) => {
            if (!err) {
                 res.send({key:'success'});
            } else {
                res.render('error', {message: 'err authing???'}); 
            }
        });
    }

    login(email, password, success, (e)=>console.log(e));
})

app.post("/api/course/", async (req, res) => {
//   app.get("/api", (req, res) => {
//     res.json({"user": ["userOne", "userTwo", "userThree"]})
// })
  const email = req.body.email;
  console.log(email, "fetch");
  const user = await User.findOne({'email': email});
  console.log(user);
  if (user === null) {
    res.status(501).json({"message": "error"});
  }
  else {
    console.log(user.course, "fetch");
    res.status(201).json({"message": "success", "course": user.course})
  }
})

app.post("/api/goals/", async (req, res) => {
  //   app.get("/api", (req, res) => {
  //     res.json({"user": ["userOne", "userTwo", "userThree"]})
  // })
    const email = req.body.email;
    console.log(email, "fetch");
    const user = await User.findOne({'email': email});
    console.log(user);
    if (user === null) {
      res.status(501).json({"message": "error"});
    }
    else {
      console.log(user.goals, "fetch");
      res.status(201).json({"message": "success", "goals": user.goals})
    }
  })

  app.post("/api/add-goal/", async (req, res) => {
    //   app.get("/api", (req, res) => {
    //     res.json({"user": ["userOne", "userTwo", "userThree"]})
    // })
      const email = req.body.email;
      const addAssignment = req.body.addAssignment;
      const addGoal = req.body.addGoal;
      const user = await User.findOne({"email": email});
      const goalsDict = user.goals ? user.goals : {};
      goalsDict[addAssignment] = addGoal;
      console.log(goalsDict)// assumes User was registered in `./db.mjs`
      user.updateOne({'$set': {goals: goalsDict}},
        ).then(result => {
        console.log(user.course);
         res.status(201).json({
            message: "success",
            goals: user.goals
        })
      }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
      });
      console.log(user);
    })
  

app.post("/api/add-course/", async (req, res) => {
  const email = req.body.email;
  const addName = req.body.addName;
  const user = await User.findOne({"email": email});
  const courseDict = user.course ? user.course : {};
  courseDict[addName] = {'syllabus': ''};
  console.log(courseDict)// assumes that User was registered in `./db.mjs`
  user.updateOne({'$set': {course: courseDict}},
    ).then(result => {
    console.log(user.course);
    user.save();
    res.status(201).json({
        message: "success",
        course: user.course
    })
  }).catch(err => {
    console.log(err),
        res.status(500).json({
            error: err
        });
  });
  console.log(user);
})

app.listen(process.env.PORT || 8000, () => {console.log('Server started on port 8000...')})