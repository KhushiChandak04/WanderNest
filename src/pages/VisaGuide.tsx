import { useState } from "react";
import axios from "axios";

export default function VisaGuide() {
  const [country, setCountry] = useState("");
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!country.trim()) return;
    setLoading(true);
    setError("");
    setInfo(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/visa/name/${country}`);
      setInfo(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">🌏 Visa & Country Guide</h1>

      <div className="flex w-full max-w-md mb-6">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country name"
          className="flex-1 border-2 border-blue-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-700 font-medium">Loading...</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {info && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-900">{info.name.common}</h2>
            <img src={info.flags.png} alt="flag" className="w-16 h-auto rounded-md border" />
          </div>
          <p className="mt-3 text-gray-700"><strong>Capital:</strong> {info.capital}</p>
          <p className="text-gray-700"><strong>Population:</strong> {info.population.toLocaleString()}</p>
          <p className="text-gray-700"><strong>Region:</strong> {info.region}</p>
          <p className="text-gray-700"><strong>CCA3 Code:</strong> {info.cca3}</p>
        </div>
      )}
    </div>
  );
}
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
