import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { useEffect, useState } from 'react';
import getEvents from './api';
import mockData from './mock-data';

const App = () => {
  const allEvents = mockData;
  const events = allEvents;

  return (
    <div className="App">
      <CitySearch />
      <EventList events={events} />
      <NumberOfEvents />
    </div>
  );
};

export default App;
