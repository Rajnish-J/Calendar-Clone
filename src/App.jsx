import { useState, useEffect } from "react";
import Calendar from "./Components/Calendar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import data from "./data/events.json";

export default function App() {
  const [events, setEvents] = useState([]);

  // Load static data (simulating a JSON file)
  useEffect(() => {
    // Add a flag `isStatic: true` to all static events
    const staticEvents = data.events.map((event) => ({
      ...event,
      isStatic: true,
    }));
    setEvents(staticEvents);
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
      setEvents([...events, { ...newEvent, isStatic: false }]);
    }
  };

  // Delete an event
  const deleteEvent = (id) => {
    const eventToDelete = events.find((event) => event.id === id);

    if (eventToDelete?.isStatic) {
      // Prevent deletion of static events
      alert("Static data cannot be deleted.");
      return;
    }

    // Allow deletion of non-static events
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Calendar
          events={events}
          onAddEvent={addOrUpdateEvent}
          onDeleteEvent={deleteEvent}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
