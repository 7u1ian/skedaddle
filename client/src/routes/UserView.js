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
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";

export default function UserView() {
  let { eventID } = useParams();
  const [state, setState] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      eventName: 'getting event name',
      renderTable: false
    }
    );

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(selection.cells);
    axios.post(`http://localhost:5000/${eventID}/avail`, {
      availability: selection.cells
    })
    .catch(e => console.log(e))
  }

  let dateArray = [];
  for (let d = new Date(state.startDate); d <= new Date(state.endDate); d.setDate(d.getDate() + 1)) {
    dateArray.push(d.toDateString());
  }

  let initSelection = [];
  for (let i = 0; i <= dateArray.length + 2; i++) {
    initSelection.push(new Array(20))
  }

  let [selection, setSelection] = useState({
    cells: initSelection
  })
  console.log(selection)

  useEffect(() => {
    axios.get(`http://localhost:5000/${eventID}`)
    .then((res) => {
      setState({
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        eventName: res.data.eventName,
        renderTable: true
      })
      setSelection({
        cells: initSelection
      })
    })
  }, [])


  return (
    <div>
      <h2>EVENT: {state.eventName}</h2>
      <DynamicTable />
      <input type="submit" onClick={handleSubmit}/>
    </div>
  )

  function DynamicTable() {
    if (state.renderTable) {
      return (
        <TableDragSelect
          value={selection.cells}
          onChange={cells => setSelection({cells})}>
            <tr>
              <td className='table-drag-select cell-disabled'></td>
              {[...Array(48)].map((col, i) => {
                if (i%2 === 0) {
                  if (i === 0) {
                    return <td key={'t' + i} className='table-drag-select cell-disabled time-am'>12</td>
                  } else if (i < 24) {
                    return <td className='table-drag-select cell-disabled time-am' key={'t' + i}>{i / 2}</td>
                  } else if (i === 24) {
                    return <td className='table-drag-select cell-disabled time-pm' key={'t' + i}>12</td>
                  } else if (i < 48) {
                    return <td className='table-drag-select cell-disabled time-pm' key={'t' + i}>{i / 2 - 12}</td>
                  } else if (i === 48) {
                    return <td className='table-drag-select cell-disabled time-am' key={'t' + i}>12</td>
                  }
              } else {
                return <th className="table-drag-select cell-disabled" />
              }
              })}
            </tr>
            {dateArray.map((date, i) => {
              let dateSplit = date.split(' ')
              return (
                <tr key={'r'+i}>
                  <td className='table-drag-select cell-disabled date'>{dateSplit[0].toUpperCase()} {`${dateSplit[1]} ${dateSplit[2]}`}</td>
                  {[...Array(48)].map((row, j) => {
                    return <td key={'c'+j}></td>
                  })}
                </tr>
              )
            })}
        </TableDragSelect>
      )
    } else return null;
  }
}
