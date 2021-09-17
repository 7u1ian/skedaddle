const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const hri = require('human-readable-ids').hri;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// simulate database
const mockDatabase = {}

// new event Route
app.post('/create-event', (req, res) => {
  const newEventID = hri.random();

  mockDatabase[newEventID] = {
    eventName: req.body.eventName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    availability: null
  }
  res.send(newEventID);

  console.log(mockDatabase);
});

function matrixSum (matrixA, matrixB) {
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA[i].length; j++) {
      matrixA[i][j] += matrixB[i][j];
      if (!matrixA[i][j]) {
        matrixA[i][j] = 0;
      }
    }
  }
}

app.post('/:eventID/avail', (req, res) => {
  if (mockDatabase[req.params.eventID]) {
    if (mockDatabase[req.params.eventID].availability) {
      matrixSum(mockDatabase[req.params.eventID].availability, req.body.availability);
      console.log(mockDatabase[req.params.eventID].availability);
    } else {
      mockDatabase[req.params.eventID].availability = req.body.availability;
    }
    res.send(mockDatabase[req.params.eventID].availability);
  } else {
    res.sendStatus(404);
  }
})

app.get('/:eventID', (req, res) => {
  if (mockDatabase[req.params.eventID]) {
    res.send(mockDatabase[req.params.eventID])
  } else {
    res.sendStatus(404);
  }
})