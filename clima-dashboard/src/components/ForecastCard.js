import {
  CloudIcon,
  SunIcon,
  CloudArrowDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../ThemeContext";

export default function ForecastCard({ forecast, unit }) {
  const { theme } = useTheme();

  if (!forecast || !forecast.list) return null;

  const daily = forecast.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  const getIcon = (main) => {
    main = main.toLowerCase();
    if (main.includes("rain"))
      return <CloudArrowDownIcon className="w-8 h-8 text-blue-600" />;
    if (main.includes("cloud"))
      return <CloudIcon className="w-8 h-8 text-gray-600" />;
    if (main.includes("clear"))
      return <SunIcon className="w-8 h-8 text-yellow-400" />;
    if (main.includes("snow"))
      return <SparklesIcon className="w-8 h-8 text-blue-300" />;
    return <CloudIcon className="w-8 h-8 text-gray-400" />;
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      weekday: "short",
    });
  };

  // Paleta aplicada aos cards
  const cardStyle =
    theme === "dark"
      ? "bg-[var(--dark2)] text-white border border-[var(--dark1)]"
      : "bg-[var(--color4)] text-gray-900 border border-[var(--color2)]";

  return (
    <div className="flex lg:flex-col gap-4 mt-6">
      {daily.map((day, idx) => (
        <div
          key={idx}
          className={`rounded-lg shadow p-4 text-center w-24 lg:w-full ${cardStyle} animate-fadeIn`}
        >
          <p className="font-semibold">{formatDay(day.dt)}</p>
          {getIcon(day.weather[0].main)}
          <p className="text-sm mt-2">
            {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
            {unit === "metric" ? "C" : "F"}
          </p>
        </div>
      ))}
    </div>
  );
}