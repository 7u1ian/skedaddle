import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
import NewEventView from './routes/NewEventView';
import UserView from './routes/UserView';

function App() {
  return (
    <div className="App">
      <h1><span className="logo-1">sked</span><span className="logo-2">addle</span></h1>
        <Router>
          <Switch>
            <Route path="/new" children={<NewEventView />} />
            <Route path="/:eventID/sked" children={<ScheduleView />} />
            <Route path="/:eventID" children={<UserView />} />
            <Route path="*">
              <h2><Link to={`/new`}>Click here to create a new event</Link></h2>
            </Route>
          </Switch>
        </Router>
    </div>
  );
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