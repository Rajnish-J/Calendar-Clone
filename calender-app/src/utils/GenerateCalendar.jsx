export default function generateCalendarDays(currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
  
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Empty cells before the first day
    }
  
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({ day, dateKey });
    }
  
    return days;
  }