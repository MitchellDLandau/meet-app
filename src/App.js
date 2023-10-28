import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import getEvents from './api';
// import mockData from './mock-data';
import './App.css';

const App = () => {
  // const allEvents = mockData;
  // const events = allEvents;
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
};

export default App;
