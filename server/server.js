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
    endDate: req.body.endDate
  }
  res.send(newEventID);

  console.log(mockDatabase);
});

app.get('/:eventID', (req, res) => {
  if (mockDatabase[req.params.eventID]) {
    res.send(mockDatabase[req.params.eventID])
  } else {
    res.sendStatus(404);
  }
})