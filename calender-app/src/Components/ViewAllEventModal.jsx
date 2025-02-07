export default function ViewAllEventsModal({ events, onClose, onDeleteEvent }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
              className="flex justify-between items-center p-2 rounded"
              style={{ backgroundColor: event.color }}
            >
              <div>
                <div className="font-medium text-white">{event.title}</div>
                <div className="text-xs text-white">{event.description}</div>
                <div className="text-xs text-white">
                  {`${event.time.hours}:${event.time.minutes} ${event.time.period}`}
                </div>
              </div>
              <button
                className="text-white hover:text-red-300"
                onClick={() => onDeleteEvent(event.id)}
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