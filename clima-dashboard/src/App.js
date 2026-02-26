import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext"; // usa o contexto global
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import LocationButton from "./components/LocationButton";
import MiniMap from "./components/MiniMap";
import AnimatedTitle from "./components/AnimatedTitle";

import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecastByCity,
} from "./services/weatherService";

export default function App() {
  const { theme, toggleTheme } = useTheme(); // acessa tema global

  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [showMap, setShowMap] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSearch = async (city) => {
    if (!city || city.trim() === "") {
      setPopupMessage("Por favor, escreva o nome da cidade.");
      setTimeout(() => setPopupMessage(""), 4000);
      return;
    }

    setLoading(true);
    try {
      const result = await getWeatherByCity(city, unit);
      const forecastResult = await getForecastByCity(city, unit);
      setData(result);
      setForecast(forecastResult);
      setError(null);
    } catch (err) {
      setError("Cidade não encontrada ou erro na API.");
      setData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocate = async (lat, lon) => {
    setLoading(true);
    try {
      const result = await getWeatherByCoords(lat, lon, unit);
      setData(result);
      setError(null);
    } catch (err) {
      setError("Localização não encontrada ou erro na API.");
      setData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
    if (data?.name) {
      handleSearch(data.name);
    }
  };

  // Paletas de cores
  const lightPalette = {
    bg: "var(--color3)",
    header: "bg-[var(--color1)]",
    section:
      "bg-gradient-to-r from-[var(--color1)] via-[var(--color2)] to-[var(--color5)]",
  };

  const darkPalette = {
    bg: "var(--dark3)",
    header: "bg-[var(--dark1)]",
    section:
      "bg-gradient-to-r from-[var(--dark1)] via-[var(--dark2)] to-[var(--dark5)]",
  };

  const palette = theme === "dark" ? darkPalette : lightPalette;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Cabeçalho */}
      <header
        className={`w-full flex justify-center items-center p-4 shadow-md ${palette.header}`}
      >
        <nav className="flex gap-6 text-white font-semibold">
          <Link to="/">Home</Link>
          <Link to="/app">Previsão</Link>
        </nav>
        <button
          onClick={toggleTheme}
          className="ml-4 text-2xl transition hover:scale-110 absolute right-4"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </header>

      {/* Hero Section */}
      <section
        className={`flex flex-col items-center justify-center py-12 ${palette.section} animate-gradient-x`}
      >
        <AnimatedTitle />
      </section>

      {/* Corpo principal */}
      <main className="flex-1 p-6 relative">
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Área de pesquisa com apenas UM botão Buscar */}
          <div className="flex gap-3 items-center w-full max-w-lg">
            <input
              type="text"
              placeholder="Digite uma cidade..."
              className={`flex-1 px-4 py-3 rounded-lg border shadow 
                          focus:outline-none focus:ring-2 
                          ${theme === "dark" ? "bg-[var(--dark2)] text-white" : "bg-white text-gray-900"}`}
              id="cityInput"
            />
            <button
              onClick={() =>
                handleSearch(document.getElementById("cityInput")?.value)
              }
              className={`px-6 py-3 rounded-lg font-semibold text-white 
                          ${palette.section} animate-gradient-x 
                          transition duration-300 ease-in-out 
                          hover:scale-110 hover:translate-y-[-3px]`}
            >
              Buscar
            </button>
          </div>

          {/* Botão Usar minha localização */}
          <LocationButton
            onLocate={handleLocate}
            className={`px-6 py-3 rounded-lg font-semibold text-white 
                        ${palette.section} animate-gradient-x 
                        transition duration-300 ease-in-out 
                        hover:scale-105 animate-bounce`}
          />

          {/* Botão Mostrar em Celsius/Fahrenheit */}
          <div className="flex gap-4">
            <button
              onClick={toggleUnit}
              className={`px-6 py-3 rounded-lg font-semibold text-white 
                          ${palette.section} animate-gradient-x 
                          transition duration-300 ease-in-out 
                          hover:scale-105 hover:rotate-1 animate-pulse`}
            >
              Mostrar em {unit === "metric" ? "Fahrenheit (°F)" : "Celsius (°C)"}
            </button>
          </div>
        </div>

        {/* Popup educado */}
        {popupMessage && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 
                       bg-white text-gray-800 px-6 py-3 rounded-lg shadow-lg 
                       animate-fadeInOut"
          >
            {popupMessage}
          </div>
        )}

        {loading && (
          <p className="text-blue-500 text-center">Carregando dados...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start w-full">
            {showMap && (
              <div className="col-span-2">
                <MiniMap coord={data.coord} city={data.name} />
              </div>
            )}
            <div className="col-span-1 flex justify-center">
              <WeatherCard data={data} unit={unit} />
            </div>
            {forecast && (
              <div className="col-span-1">
                <ForecastCard forecast={forecast} unit={unit} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}