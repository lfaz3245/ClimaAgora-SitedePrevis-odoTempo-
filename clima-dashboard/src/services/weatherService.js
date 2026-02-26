const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeatherByCity(city, units = "metric") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=pt_br`
  );
  if (!res.ok) throw new Error("Erro na API: " + res.status);
  return res.json();
}

export async function getWeatherByCoords(lat, lon, units = "metric") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=pt_br`
  );
  if (!res.ok) throw new Error("Erro na API: " + res.status);
  return res.json();
}

export async function getForecastByCity(city, units = "metric") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=pt_br`
  );
  if (!res.ok) throw new Error("Erro na API: " + res.status);
  return res.json();
}