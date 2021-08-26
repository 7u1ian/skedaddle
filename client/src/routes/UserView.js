import React from 'react';
import {useState, useEffect} from 'react';
import {DateRange} from 'react-date-range';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams} from "react-router-dom";
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function UserView() {
  let { eventID } = useParams();
  const [state, setState] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      eventName: 'getting event name'
    }
  );

  useEffect(() => {
    axios.get(`http://localhost:5000/${eventID}`)
    .then((res) => {
      console.log(res.data);
      setState({
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        eventName: res.data.eventName
      })
    })
  }, [])

  let dateArray = [];
  for (let d = new Date(state.startDate); d <= new Date(state.endDate); d.setDate(d.getDate() + 1)) {
    dateArray.push(d.toDateString());
  }

  return (
    <div>
      <h2>EVENT: {state.eventName}</h2>
      <table>
        <tr>
          <th id='date'>Date</th>
          {[...Array(49)].map((col, i) => {
            if (i%2 === 0) {
              if (i === 0) {
                return <th key={'t' + i} className='time-am'>12</th>
              } else if (i < 24) {
                return <th className='time-am' key={'t' + i}>{i / 2}</th>
              } else if (i === 24) {
                return <th className='time-pm' key={'t' + i}>12</th>
              } else if (i < 48) {
                return <th className='time-pm' key={'t' + i}>{i / 2 - 12}</th>
              } else if (i === 48) {
                return <th className='time-am' key={'t' + i}>12</th>
              }
          } else {
            return <th className="time" />
          }
          })}
        </tr>
        <tbody>
        {
        dateArray.map((date, i) => {
          let dateArray = date.split(' ')
          return (
            <tr key={i}>
              {dateArray[0].toUpperCase()}<br></br>{`${dateArray[1]} ${dateArray[2]}`}
              {
                [...Array(49)].map((col, j) => {
                  return <td key={i +', ' + j}></td>
                })
              }
            </tr>
          )
        } )
        }
        </tbody>
      </table>
    </div>
  )
}