import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1><span className="logo-1">sked</span><span className="logo-2">addle</span></h1>
      <Router>
        <Switch>
          <Route path="/new">
            <h2>NEW EVENT</h2>
          </Route>
          <Route path="/:eventID/sked" children={<ScheduleView />}>
          </Route>
          <Route path="/:eventID" children={<EventView />}>
          </Route>
          <Route path="*">
            <h2>NO MATCH</h2>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function EventView() {
  let { eventID } = useParams();

  return (
    <div>
      <h2>EVENT ID: {eventID}</h2>
    </div>
  )
}

function ScheduleView() {
  let { eventID } = useParams();

  return (
    <div>
      <h2>SCHEDULE ID: {eventID}</h2>
    </div>
  )
}

export default App;