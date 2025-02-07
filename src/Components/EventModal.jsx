import { useState } from "react";

export default function EventModal({
  selectedDay,
  editingEvent,
  onClose,
  onAddEvent,
  onDeleteEvent,
  events,
}) {
  const [title, setTitle] = useState(editingEvent?.title || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [color, setColor] = useState(editingEvent?.color || "#ff4d4d");
  const [startTime, setStartTime] = useState({
    hours: editingEvent?.startTime?.hours || "12",
    minutes: editingEvent?.startTime?.minutes || "00",
    period: editingEvent?.startTime?.period || "AM",
  });
  const [endTime, setEndTime] = useState({
    hours: editingEvent?.endTime?.hours || "12",
    minutes: editingEvent?.endTime?.minutes || "00",
    period: editingEvent?.endTime?.period || "PM",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Helper function to convert time to minutes for comparison
  const timeToMinutes = (time) => {
    const { hours, minutes, period } = time;
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    if (period === "PM" && hours !== "12") totalMinutes += 12 * 60; // Convert PM to 24-hour format
    if (period === "AM" && hours === "12") totalMinutes -= 12 * 60; // Handle 12 AM as 0
    return totalMinutes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate start time is earlier than end time
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes >= endMinutes) {
      setErrorMessage("End time must be later than start time.");
      return;
    }

    // Check for time conflicts
    const conflictingEvent = events.find(
      (event) =>
        event.date === selectedDay &&
        ((timeToMinutes(event.startTime) < endMinutes &&
          timeToMinutes(event.endTime) > startMinutes) ||
         (timeToMinutes(event.startTime) === startMinutes &&
          timeToMinutes(event.endTime) === endMinutes)) &&
        event.id !== editingEvent?.id // Exclude the current event when editing
    );

    if (conflictingEvent) {
      setErrorMessage("There is already an event during this time. Please choose a different time.");
      return;
    }

    // Clear any previous error message
    setErrorMessage("");

    const newEvent = {
      id: editingEvent?.id || Date.now(), // Retain the ID for editing
      date: selectedDay,
      title,
      description,
      color,
      startTime,
      endTime,
    };
    onAddEvent(newEvent); // Pass the event to the parent
    onClose();
  };

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
        <h2 className="text-xl font-bold mb-4">
          {editingEvent ? "Edit Event" : "Add Event"}
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={startTime.hours}
                  onChange={(e) =>
                    setStartTime({ ...startTime, hours: e.target.value })
                  }
                  min="1"
                  max="12"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  value={startTime.minutes}
                  onChange={(e) =>
                    setStartTime({ ...startTime, minutes: e.target.value })
                  }
                  min="0"
                  max="59"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={startTime.period}
                  onChange={(e) =>
                    setStartTime({ ...startTime, period: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={endTime.hours}
                  onChange={(e) =>
                    setEndTime({ ...endTime, hours: e.target.value })
                  }
                  min="1"
                  max="12"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  value={endTime.minutes}
                  onChange={(e) =>
                    setEndTime({ ...endTime, minutes: e.target.value })
                  }
                  min="0"
                  max="59"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={endTime.period}
                  onChange={(e) =>
                    setEndTime({ ...endTime, period: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {editingEvent && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  onDeleteEvent(editingEvent.id);
                  onClose();
                }}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}