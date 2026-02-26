export default function LocationButton({ onLocate }) {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocate(pos.coords.latitude, pos.coords.longitude);
      },
      () => alert("Não foi possível obter localização")
    );
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Usar minha localização
    </button>
  );
}