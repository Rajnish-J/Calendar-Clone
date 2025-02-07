import { useState } from "react";
import generateCalendarDays from "../utils/GenerateCalendar";
import EventModal from "./EventModal";
import ViewAllEventsModal from "./ViewAllEventModal";

export default function Calendar({ events, onAddEvent, onDeleteEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAllEventsModalOpen, setViewAllEventsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const calendarDays = generateCalendarDays(currentDate);

  // Handle modal open for adding a new event
  const openAddModal = (dateKey) => {
    setSelectedDay(dateKey);
    setEditingEvent(null); // Reset editing state
    setModalOpen(true);
  };

  // Handle modal open for editing an existing event
  const openEditModal = (event) => {
    setSelectedDay(event.date);
    setEditingEvent(event); // Set the event being edited
    setModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedDay(null);
    setEditingEvent(null);
    setModalOpen(false);
  };

  // Open modal to view all events for a day
  const openViewAllEventsModal = (dateKey) => {
    setSelectedDay(dateKey);
    setViewAllEventsModalOpen(true);
  };

  // Close modal to view all events
  const closeViewAllEventsModal = () => {
    setSelectedDay(null);
    setViewAllEventsModalOpen(false);
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>
          <h1 className="text-2xl font-bold text-center">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <button
            onClick={goToNextMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={index}></div>;
            }

            const dayEvents = events.filter(
              (event) => event.date === day.dateKey
            );

            // Check if the day is today
            const isToday =
              new Date().toDateString() ===
              new Date(day.dateKey).toDateString();

            return (
              <div
                key={day.dateKey}
                className={`relative text-center p-2 rounded cursor-pointer hover:bg-gray-200 ${
                  isToday
                    ? "border-2 border-blue-500"
                    : "border border-gray-200"
                }`}
                style={{ minHeight: "100px" }} // Fixed height for all days
                onClick={() => openAddModal(day.dateKey)} // Clicking the date opens the "Add Event" modal
              >
                <div className="font-medium">{day.day}</div>
                <div className="space-y-1 mt-1 overflow-y-auto">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-xs truncate text-white rounded px-1 py-0.5 cursor-pointer`}
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening the add event modal
                        openEditModal(event); // Clicking an event opens the "Edit/Delete Event" modal
                      }}
                    >
                      {`${event.title} (${event.startTime.hours}:${event.startTime.minutes} ${event.startTime.period} - ${event.endTime.hours}:${event.endTime.minutes} ${event.endTime.period})`}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div
                      className="text-xs text-blue-500 cursor-pointer mt-1"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening the add event modal
                        openViewAllEventsModal(day.dateKey); // Clicking "+X more" opens the "View All Events" modal
                      }}
                    >
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Adding/Editing Events */}
      {modalOpen && (
        <EventModal
          selectedDay={selectedDay}
          editingEvent={editingEvent}
          onClose={closeModal}
          onAddEvent={onAddEvent}
          onDeleteEvent={onDeleteEvent}
          events={events} // Pass events to check for conflicts
        />
      )}

      {/* Modal for Viewing All Events */}
      {viewAllEventsModalOpen && (
        <ViewAllEventsModal
          events={events.filter((event) => event.date === selectedDay)}
          onClose={closeViewAllEventsModal}
          onDeleteEvent={onDeleteEvent}
        />
      )}
    </div>
  );
}
