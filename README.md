# Codestrips - A full-stack application with SQLite database
> An application that allows users to create and save small one-pane comic strips.
> It uses an API built with Express to interact with the database.

## General info
The application is deployed with [Heroku](https://www.heroku.com/). It can be viewed at: [Codestrips](https://codestripsss.herokuapp.com/)


## Technologies
* HTML / CSS / JavaScript
* Node.js v12.19.0
    * Express v4.17.1
    * body-parser v1.19.0
    * morgan v1.10.0
    * sqlite3 v5.0.0
* jQuery v3.2.1
* SQLite v3.31.1

## Features
* Two pre-loaded example strips
* Select the picture, bubble text and caption for the comic strip
* Save the new strip to the database
* All the saved strips will still be available if the server is restarted

To-do list:
* Option (new button) to clear database completely
* Choice to either pre-load example strips in new database or use empty database (currently example strips come pre-loaded)
* Delete a selected strip
* Modify a selected strip

## Status
Project is: _in progress_

## Inspiration
This is a guided project that practices Node.js Express and building API's from the Web Developement Carreer Path on [Codecademy](https://www.codecademy.com/learn). Front-end was provided.