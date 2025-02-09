export default function Footer() {
  return (
    <footer className="bg-purple-600 text-white py-4 px-6 font-bold mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-black">
          &copy; {new Date().getFullYear()} CalendarMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Props validation (if props are added in the future)
Footer.propTypes = {};
