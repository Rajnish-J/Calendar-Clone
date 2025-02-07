export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} CalendarMate. All rights reserved.
        </p>
        <p>
          Made with ❤️ by{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Rajnish J
          </a>
        </p>
      </div>
    </footer>
  );
}
