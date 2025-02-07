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
  const [hours, setHours] = useState(editingEvent?.time?.hours || "12");
  const [minutes, setMinutes] = useState(editingEvent?.time?.minutes || "00");
  const [period, setPeriod] = useState(editingEvent?.time?.period || "AM");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for time conflicts
    const conflictingEvent = events.find(
      (event) =>
        event.date === selectedDay &&
        event.time.hours === hours &&
        event.time.minutes === minutes &&
        event.time.period === period &&
        event.id !== editingEvent?.id // Exclude the current event when editing
    );

    if (conflictingEvent) {
      setErrorMessage("There is already an event at this time. Please choose a different time.");
      return;
    }

    // Clear any previous error message
    setErrorMessage("");

    const newEvent = {
      id: editingEvent?.id || Date.now(),
      date: selectedDay,
      title,
      description,
      color,
      time: { hours, minutes, period },
    };
    onAddEvent(newEvent);
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
          <div className="mb-4 flex gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Hours</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="1"
                max="12"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">AM/PM</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
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