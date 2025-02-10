# **CalendarMate**

**CalendarMate** is a modern, interactive calendar application that allows users to manage events with ease. Users can add, edit, delete, and view events on specific dates, ensuring efficient time management. The app also prevents conflicts by checking overlapping event times and ensures past events cannot be modified or deleted. (static - under development)

---

## **Table of Contents**
1. [Description](#description)
2. [Technology Stack](#technology-stack)
3. [Setup Instructions](#setup-instructions)
4. [Dependencies](#dependencies)
5. [Folder Structure](#folder-structure)
6. [Features](#features)
7. [Feature Plans](#feature-plans)

---

## **Description**
CalendarMate is a React-based web application designed to help users organize their schedules. It provides an intuitive interface for managing events, including:
- Adding new events with custom titles, descriptions, colors, and time ranges.
- Editing existing events.
- Viewing all events for a specific day.
- Preventing time conflicts between events.
- Disabling interactions for past events.

The app uses JSON data for static events and dynamically updates the state for user-added events. It also includes responsive design and accessibility features.

---

## **Technology Stack**
- **Frontend Framework**: React.js
- **Styling**: TailwindCSS (for utility-first styling) and custom CSS
- **State Management**: React's `useState` and `useEffect` hooks
- **Data Storage**: Static JSON file (`events.json`) for initial data
- **Validation**: Prop-types for component props validation
- **Font**: Montserrat font for typography
- **Linting**: ESLint for code quality checks (optional)

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn

### **Steps to Set Up**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/CalendarMate.git
   cd CalendarMate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. Open the app in your browser:
   - By default, the app runs at `http://localhost:5173`.

5. Build for production:
   ```bash
   npm run build
   ```

---

## **Dependencies**
### **Core Dependencies**
- `react`: ^18.x
- `react-dom`: ^18.x
- `prop-types`: ^15.x
- `tailwindcss`: ^3.x

### **Development Dependencies**
- `eslint`: ^8.x (optional for linting)
- `prettier`: ^2.x (optional for code formatting)

---

## **Folder Structure**
```
CalendarMate/
├── public/               # Public assets (e.g., favicon, fonts)
│   ├── font/             # Custom fonts (e.g., Montserrat)
│   └── index.html        # Main HTML file
├── src/
│   ├── Components/       # Reusable components
│   │   ├── Calendar.jsx  # Main calendar logic
│   │   ├── EventModal.jsx # Modal for adding/editing events
│   │   ├── ViewAllEventModal.jsx # Modal for viewing all events
│   │   ├── Header.jsx    # App header
│   │   └── Footer.jsx    # App footer
│   ├── data/             # Static data files
│   │   └── events.json   # Initial events data
│   ├── utils/            # Utility functions
│   │   └── GenerateCalendar.js # Function to generate calendar days
│   ├── App.jsx           # Main application file
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json          # Project metadata and dependencies
├── README.md             # This file
└── tailwind.config.js    # TailwindCSS configuration
```

---

## **Features**
### **Current Features**
1. **Event Management**:
   - Add, edit, and delete events.
   - View all events for a specific day.
   - Prevent overlapping events using time conflict validation.

2. **Past Event Restrictions**:
   - Disable editing or deleting events from past dates.
   - Alert users when attempting to modify past events.

3. **Static Data Protection**:
   - Protect static events loaded from `events.json` from deletion.
   - Alert users when attempting to delete static data.

4. **Responsive Design**:
   - Optimized for various screen sizes (desktop, tablet, mobile).

5. **User-Friendly Interface**:
   - Intuitive navigation for switching months.
   - Clear visual indicators for today's date and past dates.

---

## **Feature Plans**
### **Upcoming Features**
1. **Authentication**:
   - Add user login/signup functionality to store events in a database (e.g., Firebase or MongoDB).

2. **Persistent Storage**:
   - Save user-added events in local storage or a backend database.

3. **Drag-and-Drop Events**:
   - Allow users to drag and drop events to reschedule them.

4. **Notifications**:
   - Implement reminders and notifications for upcoming events.

5. **Export/Import Events**:
   - Export events to a `.ics` file or import events from external calendars.

6. **Dark Mode**:
   - Add a toggle for dark mode for better accessibility.

7. **Multi-Language Support**:
   - Add support for multiple languages using i18n libraries.

8. **Analytics Dashboard**:
   - Provide insights into event frequency, duration, and trends.

---

## **Acknowledgments**
- Inspired by modern calendar applications like Google Calendar and Outlook.
- Special thanks to the open-source community for providing tools like React, TailwindCSS, and PropTypes.