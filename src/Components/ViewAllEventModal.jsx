import PropTypes from "prop-types";

export default function ViewAllEventsModal({
  events,
  onClose,
  onDeleteEvent,
  onEditEvent,
}) {
  // Helper function to check if a date is in the past
  const isPastDate = (dateKey) => {
    const today = new Date();
    const eventDate = new Date(dateKey);
    return eventDate < today.setHours(0, 0, 0, 0); // Compare only the date part
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">All Events</h2>

        {/* List of Events */}
        {events.map((event, idx) => {
          const isPast = isPastDate(event.date);
          return (
            <div
              key={idx}
              className={`p-2 border rounded flex justify-between items-center ${
                isPast ? "opacity-50" : ""
              }`}
              style={{ backgroundColor: event.color }}
            >
              <div>
                <div
                  className={`font-medium ${
                    isPast ? "line-through text-gray-400" : ""
                  }`}
                >
                  {event.title}
                </div>
                <div className={`text-sm ${isPast ? "text-gray-400" : ""}`}>
                  {event.description}
                </div>
                <div className={`text-xs ${isPast ? "text-gray-400" : ""}`}>
                  {`${event.startTime.hours}:${event.startTime.minutes} ${event.startTime.period} - ${event.endTime.hours}:${event.endTime.minutes} ${event.endTime.period}`}
                </div>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                  onClick={() => {
                    if (!isPast) onEditEvent(event);
                    else alert("You cannot edit events from past dates.");
                  }}
                  disabled={isPast || event.isStatic} // Disable for past events and static events
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (event.isStatic) {
                      alert("Static data cannot be deleted.");
                      return;
                    }
                    if (!isPast) onDeleteEvent(event.id);
                    else alert("You cannot delete events from past dates.");
                  }}
                  disabled={isPast || event.isStatic} // Disable for past events and static events
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Props validation
ViewAllEventsModal.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
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
      isStatic: PropTypes.bool, // New prop to identify static events
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
};
