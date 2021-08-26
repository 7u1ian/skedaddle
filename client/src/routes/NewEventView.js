import React from 'react';
import {useState} from 'react';
import {DateRange} from 'react-date-range';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from "react-router-dom";
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function EventButton({eventID}) {
  if (eventID) {
    return (
      <>
        <p>Your event has been created!</p>
        <p>Go to
        <Link to={`/${eventID}`}>{eventID}</Link></p>
      </>
    )
  } else return null;
}

export default function NewEventView() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
      eventName: '',
      eventID: ''
    }
  ]);

  let dateArray = [];
  if (state[0].endDate && (state[0].startDate.getDate() !== state[0].endDate.getDate())) {
    for (let d = new Date(state[0].startDate); d <= state[0].endDate; d.setDate(d.getDate() + 1)) {
      dateArray.push(d.toDateString());
    }
    console.log(dateArray);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/create-event', {
      startDate: state[0].startDate,
      endDate: state[0].endDate,
      eventName: state[0].eventName
    })
    .then(res => setState([
      {
        startDate: state[0].startDate,
        endDate: state[0].endDate,
        key: state[0].key,
        eventName: state[0].eventName,
        eventID: res.data
      }
    ]));
  }

  return(
    <>
    <div className="create-event-form">
      <div className="calendar-div">
      <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Event name:
          <input type="text" name="event-name" onChange={e=> setState([{
            startDate: state[0].startDate,
            endDate: state[0].endDate,
            key: state[0].key,
            eventName: e.target.value,
            eventID: state[0].eventID
          }])}/>
        </label>
        <input type="submit"/>
        <EventButton eventID={state[0].eventID} />
      </form>
    </div>
      <table>
        <tr>
          <th>Date</th>
          {[...Array(48)].map((col, i) => {
            let timeStr = '';
            if (i%4 === 0) {
              if (i === 0) {
                timeStr = '12am';
              } else if (i < 24) {
                timeStr = i / 2 + 'am';
              } else if (i === 24) {
                timeStr = '12pm';
              } else if (i < 48) {
                timeStr = i / 2 - 12 + 'pm'
              }
            }
            return(
              <th>{timeStr}</th>
            )
          })}
        </tr>
        <tbody>
        {
        dateArray.map((date) => {
          let dateArray = date.split(' ')
          return (
            <tr>{dateArray[0]}<br></br>{`${dateArray[1].toUpperCase()} ${dateArray[2]}`}</tr>
          )
        } )
        }
        </tbody>
      </table>
    </>
  )
}