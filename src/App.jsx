import { useState, useEffect } from "react";
import Calendar from "./Components/Calendar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import data from "./data/events.json";

export default function App() {
  const [events, setEvents] = useState([]);

  // Load static data (simulating a JSON file)
  useEffect(() => {
    setEvents(data.events);
  }, []);

  // Add or update an event
  const addOrUpdateEvent = (newEvent) => {
    if (newEvent.id && events.some((event) => event.id === newEvent.id)) {
      // Editing: Replace the existing event
      setEvents(
        events.map((event) => (event.id === newEvent.id ? newEvent : event))
      );
    } else {
      // Adding: Append the new event
      setEvents([...events, newEvent]);
    }
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Calendar
        events={events}
        onAddEvent={addOrUpdateEvent}
        onDeleteEvent={deleteEvent}
      />
      <Footer />
    </div>
  );
}
