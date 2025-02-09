import PropTypes from "prop-types";

export default function ViewAllEventsModal({
  events,
  onClose,
  onDeleteEvent,
  onEditEvent,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">All Events</h2>

        {/* List of Events */}
        <div className="space-y-2">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-2 rounded flex justify-between items-center bg-purple-500" // Use the event's color as the background
            >
              <div>
                <div className="font-bold text-black">{event.title}</div>{" "}
                {/* White text for contrast */}
                <div className="text-sm font-bold text-black">
                  {event.description}
                </div>{" "}
                {/* White text for contrast */}
                <div className="text-xs text-black">
                  {`${event.startTime.hours}:${event.startTime.minutes} ${event.startTime.period} - ${event.endTime.hours}:${event.endTime.minutes} ${event.endTime.period}`}
                </div>
              </div>
              <div className="flex space-x-2">
                {/* Edit Button */}
                <button
                  className="px-2 py-1 bg-blue-500 text-black font-bold rounded hover:bg-blue-600"
                  onClick={() => onEditEvent(event)} // Call the edit handler
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="px-2 py-1 bg-red-500 text-black font-bold rounded hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(event.id);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
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
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onEditEvent: PropTypes.func.isRequired,
};
