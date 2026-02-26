import { useTheme } from "../ThemeContext";

export default function AnimatedTitle() {
  const { theme } = useTheme();

  const lightGradient =
    "bg-gradient-to-r from-[var(--color1)] via-[var(--color2)] to-[var(--color5)]";
  const darkGradient =
    "bg-gradient-to-r from-[var(--dark1)] via-[var(--dark2)] to-[var(--dark5)]";

  return (
    <div className="flex flex-col items-center mb-8">
      <h1
        className={`text-6xl font-extrabold text-transparent bg-clip-text animate-gradient-x ${
          theme === "dark" ? darkGradient : lightGradient
        } animate-glow`}
        style={{
          WebkitTextStroke: "0.5px rgba(0,0,0,0.4)", // contorno leve
        }}
      >
        🌦️ Clima Agora
      </h1>
      <p
        className={`mt-2 animate-fadeIn ${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Seu portal dinâmico de previsão do tempo
      </p>
    </div>
  );
}