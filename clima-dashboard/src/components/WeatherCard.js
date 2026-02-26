import {
  CloudIcon,
  SunIcon,
  CloudArrowDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

export default function WeatherCard({ data, unit }) {
  const { theme } = useTheme();

  if (!data || !data.weather || data.weather.length === 0) {
    return <p className="text-red-500">Dados de clima indisponíveis.</p>;
  }

  const main = data.weather[0].main.toLowerCase();

  const getWeatherIcon = () => {
    if (main.includes("rain"))
      return <CloudArrowDownIcon className="w-12 h-12 text-blue-600" />;
    if (main.includes("cloud"))
      return <CloudIcon className="w-12 h-12 text-gray-600" />;
    if (main.includes("clear"))
      return <SunIcon className="w-12 h-12 text-yellow-400" />;
    if (main.includes("snow"))
      return <SparklesIcon className="w-12 h-12 text-blue-300" />;
    return <CloudIcon className="w-12 h-12 text-gray-400" />;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Estilo principal do card (igual ao ForecastCard)
  const cardStyle =
    theme === "dark"
      ? "bg-[var(--dark2)] text-white border border-[var(--dark1)]"
      : "bg-[var(--color4)] text-gray-900 border border-[var(--color2)]";

  return (
    <div
      className={`relative rounded-xl p-6 text-center w-96 animate-fadeIn shadow-lg ${cardStyle}`}
    >
      <h2 className="text-3xl font-bold mb-4">{data.name}</h2>

      <div className="flex flex-col items-center mb-6">
        {getWeatherIcon()}
        <p className="text-5xl font-extrabold mt-2">
          {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
        </p>
        <p
          className={`capitalize ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {data.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Umidade</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Vento</p>
          <p>
            {Math.round(data.wind.speed)} {unit === "metric" ? "km/h" : "mph"}
          </p>
        </div>
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Sensação</p>
          <p>
            {Math.round(data.main.feels_like)}°{unit === "metric" ? "C" : "F"}
          </p>
        </div>
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Pressão</p>
          <p>{data.main.pressure} hPa</p>
        </div>
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Nascer do sol</p>
          <p>{formatTime(data.sys.sunrise)}</p>
        </div>
        <div className={`${cardStyle} rounded-lg p-3 shadow`}>
          <p className="font-semibold">Pôr do sol</p>
          <p>{formatTime(data.sys.sunset)}</p>
        </div>
      </div>

      <p
        className={`text-xs mt-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Última atualização:{" "}
        {new Date(data.dt * 1000).toLocaleTimeString("pt-BR")}
      </p>
    </div>
  );
}