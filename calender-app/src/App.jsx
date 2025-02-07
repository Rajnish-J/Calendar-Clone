import { useState, useEffect } from "react";
import Calendar from "./Components/Calendar";
import data from "./data/events.json";

export default function App() {
  const [events, setEvents] = useState([]);

  // Load static data (simulating a JSON file)
  useEffect(() => {
    setEvents(data.events);
  }, []);

  // Add a new event
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Calendar
        events={events}
        onAddEvent={addEvent}
        onDeleteEvent={deleteEvent}
      />
    </div>
  );
}
