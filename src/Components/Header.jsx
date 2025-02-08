export default function Header() {
  return (
    <header className="bg-purple-600 text-white py-4 px-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">
          <span className="text-stone-950 mr-0.5">C</span>alendar
          <span className="text-stone-950 ml-0.5">M</span>ate
        </h1>
      </div>
    </header>
  );
}

// Props validation (if props are added in the future)
Header.propTypes = {};
