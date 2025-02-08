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
        <h2 className="text-xl font-bold mb-4">All Events</h2>
        <div className="space-y-2">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 rounded cursor-pointer"
              style={{ backgroundColor: event.color }}
              onClick={() => onEditEvent(event)} // Open Edit Event Modal
            >
              <div>
                <div className="font-medium text-white">{event.title}</div>
                <div className="text-xs text-white">{event.description}</div>
                <div className="text-xs text-white">
                  {`${event.startTime.hours}:${event.startTime.minutes} ${event.startTime.period} - ${event.endTime.hours}:${event.endTime.minutes} ${event.endTime.period}`}
                </div>
              </div>
              <button
                className="text-white hover:text-red-300"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening the edit modal
                  onDeleteEvent(event.id); // Delete the event
                }}
              >
                &times;
              </button>
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
