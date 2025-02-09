import { useState } from "react";
import PropTypes from "prop-types";
import generateCalendarDays from "../utils/GenerateCalendar";
import EventModal from "./EventModal";
import ViewAllEventsModal from "./ViewAllEventModal";

export default function Calendar({ events, onAddEvent, onDeleteEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAllEventsModalOpen, setViewAllEventsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // Tracks the event being edited
  const calendarDays = generateCalendarDays(currentDate);

  // Open Add Event Modal
  const openAddModal = (dateKey) => {
    setSelectedDay(dateKey);
    setEditingEvent(null); // Reset editing state
    setModalOpen(true);
  };

  // Open Edit Event Modal
  const openEditModal = (event) => {
    setSelectedDay(event.date);
    setEditingEvent(event); // Set the event being edited
    setViewAllEventsModalOpen(false); // Close the "All Events Modal"
    setModalOpen(true); // Open the EventModal for editing
  };

  // Close Modals
  const closeModal = () => {
    setSelectedDay(null);
    setEditingEvent(null);
    setModalOpen(false);
  };

  // Open View All Events Modal
  const openViewAllEventsModal = (dateKey) => {
    setSelectedDay(dateKey);
    setViewAllEventsModalOpen(true);
  };

  // Close View All Events Modal
  const closeViewAllEventsModal = () => {
    setSelectedDay(null);
    setViewAllEventsModalOpen(false);
  };

  // Navigate to Previous Month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to Next Month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full relative">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold sm:text-2xl">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded hover:bg-purple-700 bg-purple-500 text-black"
            >
              ❮
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded hover:bg-purple-700 bg-purple-500 text-black"
            >
              ❯
            </button>
          </div>
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
            if (!day) return <div key={index}></div>;
            const dayEvents = events.filter(
              (event) => event.date === day.dateKey
            );
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
                style={{ minHeight: "100px" }}
                onClick={() => openAddModal(day.dateKey)}
              >
                <div className="font-medium">{day.day}</div>
                <div className="space-y-1 mt-1 overflow-y-auto">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div
                      key={idx}
                      className="text-xs truncate text-white rounded px-1 py-0.5 cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div
                      className="text-xs text-blue-500 cursor-pointer mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openViewAllEventsModal(day.dateKey);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
            <EventModal
              selectedDay={selectedDay}
              editingEvent={editingEvent}
              onClose={closeModal}
              onAddEvent={onAddEvent}
              onDeleteEvent={onDeleteEvent}
              events={events}
            />
          </div>
        </div>
      )}

      {/* Modal for Viewing All Events */}
      {viewAllEventsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
            <ViewAllEventsModal
              events={events.filter((event) => event.date === selectedDay)}
              onClose={closeViewAllEventsModal}
              onDeleteEvent={onDeleteEvent}
              onEditEvent={openEditModal} // Pass the edit event handler
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Props validation
Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      startTime: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        minutes: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
      }).isRequired,
      endTime: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        minutes: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onAddEvent: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
};
