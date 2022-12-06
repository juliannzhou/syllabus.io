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

const signup = (email, password, errorCallback, successCallback) => {
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
              console.log(req.session.user);
            });
        });
        
      }
      else {
        errorCallback('EMAIL ALREADY EXISTS');
      }
    })
    User.findOne({'email': email});
  };




app.get("/api", (req, res) => {
    res.json({"user": ["userOne", "userTwo", "userThree"]})
})

app.post("/api/login/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)// assumes that User was registered in `./db.mjs`

    function success(newUser) {
        startAuthenticatedSession(req, newUser, (err) => {
            if (!err) {
                req.session.cookie.user = newUser;
                res.send({key:'success'});
            } else {
                res.render('error', {message: 'err authing???'}); 
            }
        });
    }

    login(email, password, success, (e)=>console.log(e));
})

app.post("/api/signup/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password != cpassword) {
        console.log('Password do not match!');
    }
    else {
        signup(email, password, (e)=>console.log(e), (user) => startAuthenticatedSession(req, user, (e) => console.log(e)))
        console.log(req.body)
        res.send("Success")
    }
})
 

app.listen(process.env.PORT || 8000, () => {console.log('Server started on port 8000...')})