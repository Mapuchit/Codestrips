const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');
// import the database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

const PORT = process.env.PORT || 4001;

// body-parsing middleware to parse JSON bodies
app.use(bodyParser.json());
// a logging middleware
morgan('dev');

// serve the Codestrips site
app.use(express.static('public'));



//// Routes


// a route to monitor the /strips endpoint for GET requests
app.get('/strips', (req, res, next) => {
    // get an array of all strips from the Strip table
    db.all('SELECT * FROM Strip', (error, rows) => {
      if (error) {
        throw error;
      }
      // send back the array of all strips as an object
      res.send({ strips: rows });
    });
});


// a route to monitor the /strips endpoint for POST requests
app.post('/strips', (req, res, next) => {
    // validate the strip and send a 400 response if it is invalid (missing any of the required properties)
    // the new Strip will arrive as a strip property on the request body
    const newStrip = req.body.strip;
    if (!newStrip.head || !newStrip.body || !newStrip.background || !newStrip.bubbleType) {
      res.status(400).send();
    }
    // INSERT a new strip into the database using the req.body.strip values
    db.run('INSERT INTO Strip (head, body, background, bubble_type, bubble_text, caption) VALUES ($head, $body, $background, $bubbleType, $bubbleText, $caption)', {
      $head: newStrip.head,
      $body: newStrip.body,
      $background: newStrip.background,
      $bubbleType: newStrip.bubbleType,
      $bubbleText: newStrip.bubbleText,
      $caption: newStrip.caption
      }, 
      function(err) {
        if (err) {
          res.status(500).send();
        }
        // find the newly-created strip if no error occurred (with id this.lastID)
        db.get('SELECT * FROM Strip WHERE id = $id', {
            $id: this.lastID
            },
            function(error, row) {
              // send the response as an object
              res.status(201).send( {strip: row} );
            }
        );
    });
});


// start the server listening on the correct PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;