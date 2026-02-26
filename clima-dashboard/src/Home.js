import { Link, useNavigate } from "react-router-dom";
import AnimatedTitle from "./components/AnimatedTitle";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";
import { getWeatherByCoords } from "./services/weatherService";

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [time, setTime] = useState(new Date());
  const [locationWeather, setLocationWeather] = useState(null);

  // Atualiza relógio a cada segundo
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Obtém clima pela localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const result = await getWeatherByCoords(latitude, longitude, "metric");
          setLocationWeather(result);
        } catch (err) {
          console.error("Erro ao obter clima pela localização:", err);
        }
      });
    }
  }, []);

  const fakeCities = [
    { name: "São Paulo", temp: 28, weather: "☀️" },
    { name: "Rio de Janeiro", temp: 30, weather: "🌦️" },
    { name: "Curitiba", temp: 22, weather: "☁️" },
    { name: "Recife", temp: 31, weather: "🌞" },
  ];

  const fakeNews = [
    "Frente fria chegando ao Sul do Brasil",
    "Previsão de calor intenso no Nordeste",
    "Chuvas isoladas em São Paulo",
    "Semana será marcada por clima instável",
  ];

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={{
        backgroundColor: theme === "dark" ? "var(--dark3)" : "var(--color3)",
      }}
    >
      {/* Cabeçalho */}
      <header
        className={`w-full flex justify-center items-center p-4 shadow-md ${
          theme === "dark" ? "bg-[var(--dark1)]" : "bg-[var(--color1)]"
        }`}
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
      <section className="flex flex-col items-center justify-center flex-1 relative">
        <AnimatedTitle />

        {/* Relógio de fundo */}
        <div
          className={`absolute top-10 right-10 text-6xl font-bold opacity-30 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {time.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>

        <p className="text-lg mt-2">Bem-vindo ao Clima Agora!</p>
        <button
          onClick={() => navigate("/app")}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition animate-pulse"
        >
          Ver Previsão
        </button>

        {/* Cidade e temperatura pela localização */}
{locationWeather && (
  <div
    className={`mt-6 px-6 py-4 rounded-xl shadow-lg border-2 text-center ${
      theme === "dark"
        ? "bg-[var(--dark2)] text-white border-[var(--dark1)]"
        : "bg-[var(--color4)] text-gray-900 border-[var(--color2)]"
    } animate-fadeIn`}
  >
    <p className="text-3xl font-extrabold tracking-wide">
      📍 {locationWeather.name}
    </p>
    <p className="text-2xl font-semibold mt-2">
      {Math.round(locationWeather.main.temp)}°C
    </p>
  </div>
)}

        {/* Cidades aleatórias */}
        <div className="flex gap-6 mt-10">
          {fakeCities.map((city, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow p-4 text-center w-40 ${
                theme === "dark" ? "bg-[var(--dark2)] text-white" : "bg-white"
              }`}
            >
              <p className="font-bold">{city.name}</p>
              <p className="text-2xl">{city.weather}</p>
              <p className="text-lg">{city.temp}°C</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar esquerda com notícias */}
      <aside
        className={`fixed left-0 top-20 w-64 p-4 shadow-lg hidden lg:block ${
          theme === "dark" ? "bg-[var(--dark2)] text-white" : "bg-[var(--color4)]"
        }`}
      >
        <h2 className="font-bold mb-4">📰 Notícias</h2>
        <ul className="space-y-2">
          {fakeNews.map((news, idx) => (
            <li key={idx} className="text-sm">
              {news}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-4">
          <a href="#">📸 Instagram</a>
          <a href="#">🐦 Twitter</a>
        </div>
      </aside>

      {/* Notificação rolando */}
      <div
        className={`fixed left-0 bottom-0 w-64 p-2 animate-slideUp ${
          theme === "dark" ? "bg-[var(--dark1)] text-white" : "bg-[var(--color2)]"
        }`}
      >
        <p className="text-sm">🌩️ Alerta: Tempestade prevista no Sul</p>
      </div>

      {/* Rodapé */}
      <footer
        className={`w-full text-center py-4 mt-6 ${
          theme === "dark" ? "bg-[var(--dark4)] text-white" : "bg-[var(--color5)]"
        }`}
      >
        <p>© 2026 Clima Agora. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}