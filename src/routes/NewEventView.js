import React from 'react';
import {useState} from 'react';
import {DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function NewEventView() {
  const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      }
    ]);

  // let dateIter = new Date(state[0].startDate);
  // while (dateIter <= state[0].endDate) {
  //   console.log(dateIter.toDateString());

  //   let nextIter = dateIter.setDate(dateIter.getDate() + 1);
  //   dateIter = new Date(nextIter);
  // }

  let dateArray = [];
  if (state[0].endDate && (state[0].startDate.getDate() !== state[0].endDate.getDate())) {
    for (let d = new Date(state[0].startDate); d <= state[0].endDate; d.setDate(d.getDate() + 1)) {
      dateArray.push(d.toDateString());
    }
    console.log(dateArray);
  }

  return(
    <>
      <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
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
      {
      dateArray.map((date) => {
        let dateArray = date.split(' ')
        return (
          <tr>{dateArray[0]}<br></br>{`${dateArray[1].toUpperCase()} ${dateArray[2]}`}</tr>
        )
      } )
      }
      </table>
    </>
  )
}