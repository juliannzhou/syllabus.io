The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(project name)

# Syllabus.io

## Overview

(a brief one or two paragraph, high-level description of your project)

Are you cramming for an exam the night before the exam? Are you scrambling to finish the last word of your paper before due date? Then syllabus.io is for you!!! This web app converts your syllabus into a personalized schedule and to-do list. syllabus.io reads basic course info, course content, assignment deadlines, exam dates, as well as grade percentage distribution from your uploaded syllabi and organizes the information into a personalized to-do list and schedule. It will let you set your goal for each course (number of hours to study, desired grade) and calculate the grades you need to achieve for each assignment, as well as organize your study plan into a to-do list and schedule.


## Data Model

(a description of your application's data and their relationships to each other) 

The application will store Users, Courses / Syllabi, Dates, Assignments, Course Content

* users can have multiple courses 
* each course can have basic info, course content by week, and multiple assignments, quizzes, exams

(sample documents)

An Example User:

```javascript
{
  username: "workhardplayhard123",
  hash: // a password hash,
  syllabi: // an array of uploaded syllabi
  course:  {
              "Applied Internet Technology": { "syllabus": (url path to syllabus)}
           }
           // stored as an mixed object in javascript object form
  goals:  {
              "Assignment 1": "90",
              "Assignment 2": "100"
              ,,,
           }
            // stored as an mixed object in javascript object form
            
            
   
}
```

## [Link to Commented First Draft Schema](db.mjs) 

(create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)
Home: 

[home](wireframes/home.jpg)
[course_list](wireframes/course_list.jpg)
[user_dashboard](wireframes/user_dashboard.jpg)


## Site map

(draw out a site map that shows how pages are related to each other)

[site_map](site_map.jpg)

## User Stories or Use Cases

(write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a upload syllbi to website
4. as a user, I can view the the uploaded syllabus and my goals
4. as a user, I can set goals for assignements

## Research Topics

(the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Parsing documents
    * investigate document parse strategies, possible use of natural language processing, parsing libraries, as well as parsing by keywords
* (3 points) Document uploads
    * find out how document uploading works on web application andm ethods of storing documents
* (3 points) Integrate user authentication
    * send email to verify user
* (4 points) Possible add-on features to set reminder on windows/ios, export schedule to Google Calendar, 
* (4 points) react
    * used react as the frontend framework; 

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [parsing strategies](https://medium.com/@chetcorcos/introduction-to-parsers-644d1b5d7f3d)
2. [tutorial on react.js](https://www.youtube.com/watch?v=bMknfKXIFA8)

