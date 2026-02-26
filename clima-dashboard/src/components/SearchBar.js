import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite uma cidade..."
        className="px-3 py-2 border rounded w-full"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </form>
  );
}