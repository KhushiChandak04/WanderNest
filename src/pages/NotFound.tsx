import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] via-[#414345] to-[#0f2027] text-white font-playfair">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff512f] via-[#1fd1f9] to-[#b621fe] drop-shadow-lg animate-pulse">
          404
        </h1>
        <p className="text-2xl text-white/80 mb-4 font-medium">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="bg-gradient-to-r from-[#1fd1f9] to-[#b621fe] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform text-lg inline-block"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
