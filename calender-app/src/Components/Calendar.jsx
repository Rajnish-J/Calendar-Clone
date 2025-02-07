import { useState } from "react";
import generateCalendarDays from "../utils/GenerateCalendar";
import EventModal from "./EventModal";
import ViewAllEventsModal from "./ViewAllEventModal";

export default function Calendar({ events, onAddEvent, onDeleteEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewAllEventsModalOpen, setViewAllEventsModalOpen] = useState(false);

  const calendarDays = generateCalendarDays(currentDate);

  // Handle modal open
  const openModal = (dateKey) => {
    setSelectedDay(dateKey);
    setModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedDay(null);
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
          {/* Previous Month Button */}
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>

          {/* Current Month Header */}
          <h1 className="text-2xl font-bold text-center">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h1>

          {/* Next Month Button */}
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

            const dayEvents = events.filter((event) => event.date === day.dateKey);

            return (
              <div
                key={day.dateKey}
                className="relative text-center p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-200"
                onClick={() => openModal(day.dateKey)}
              >
                <div className="font-medium">{day.day}</div>
                <div className="space-y-1 mt-1">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-xs truncate text-white rounded px-1 py-0.5`}
                      style={{ backgroundColor: event.color }}
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
        <EventModal
          selectedDay={selectedDay}
          onClose={closeModal}
          onAddEvent={onAddEvent}
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