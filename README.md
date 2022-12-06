The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

# Syllabus.io

## Overview

(__TODO__: a brief one or two paragraph, high-level description of your project)

Are you cramming for an exam the night before the exam? Are you scrambling to finish the last word of your paper before due date? Then syllabus.io is for you!!! This web app converts your syllabus into a personalized schedule and to-do list. syllabus.io reads basic course info, course content, assignment deadlines, exam dates, as well as grade percentage distribution from your uploaded syllabi and organizes the information into a personalized to-do list and schedule. It will let you set your goal for each course (number of hours to study, desired grade) and calculate the grades you need to achieve for each assignment, as well as organize your study plan into a to-do list and schedule.


## Data Model

(__TODO__: a description of your application's data and their relationships to each other) 

The application will store Users, Courses / Syllabi, Dates, Assignments, Course Content

* users can have multiple courses 
* each course can have basic info, course content by week, and multiple assignments, quizzes, exams

(__TODO__: sample documents)

An Example User:

```javascript
{
  username: "workhardplayhard123",
  hash: // a password hash,
  syllabi: // an array of uploaded syllabi
  course_name: // an array of course names
}
```

An Example Course with Embedded Deadlines:

```javascript
{
  user: // a reference to a User object
  name: "Applied Internet Technology",
  basic_info: {instructor: "Joseph Versoza", course_number: "CSCI-UA.0467", topics: ['javascript', 'Server Side Programming (with Node and Express)', '...']}
  deadlines: [
    { name: "Quizzes #1 and #2", due: "2022-09-14"},
    { name: "Homework #1", due: "2022-09-23"},
  ],
  grading: {Homework: 0.25, Exam_1: .3, Exam_2: 0.3
, Quizzes: 0.05, In-Class_Activities: 0.1,
  Final Project: 0.1}
}
```


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)
Home: 

[home](wireframes/home.jpg)
[course_list](wireframes/course_list.jpg)
[user_dashboard](wireframes/user_dashboard.jpg)


## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

[site_map](site_map.jpg)

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a upload syllbi to website
4. as a user, I can view the auto-generated to-do list with deadlines
4. as a user, I can set goals for final grade and view generated minimum grade required for each assignment / quizzes / exams based on grade percentage distribution
5. as a user, I can set goals for hours of study each week and view personalized study plan based on course content
6. as a user, I can update grades to completed assignment / quizzes / exams and see updated goals for future assignments

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

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

