# 🌦️ Clima Agora

O **Clima Agora** é uma aplicação web moderna e interativa de previsão do tempo, desenvolvida para oferecer informações meteorológicas precisas com uma interface elegante e responsiva. O projeto foi construído utilizando **React**, **TailwindCSS** e integrações com a API do **OpenWeatherMap**.

---

## 🚀 Funcionalidades

- **Busca por Cidade:** Pesquise o clima em tempo real de qualquer cidade do mundo.
- **Geolocalização:** Obtenha a previsão do tempo baseada na sua localização atual com um clique.
- **Previsão Estendida:** Visualize a previsão para os próximos dias.
- **Mapa Interativo:** Mini-mapa integrado mostrando a localização da cidade pesquisada (via Leaflet).
- **Alternância de Unidades:** Troque facilmente entre Celsius (°C) e Fahrenheit (°F).
- **Modo Escuro/Claro:** Suporte a temas com transições suaves, gerenciado via Context API.
- **Interface Dinâmica:** Animações personalizadas, relógio em tempo real e seção de notícias simuladas.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://reactjs.org/):** Biblioteca principal para a construção da interface.
- **[TailwindCSS](https://tailwindcss.com/):** Framework CSS para estilização rápida e responsiva.
- **[React Router](https://reactrouter.com/):** Gerenciamento de rotas e navegação.
- **[Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/):** Mapas interativos.
- **[Heroicons](https://heroicons.com/):** Conjunto de ícones SVG.
- **[OpenWeatherMap API](https://openweathermap.org/api):** Fonte de dados meteorológicos.
- **Context API:** Gerenciamento de estado global para o tema da aplicação.

---

## 📦 Estrutura do Projeto

```text
clima-dashboard/
├── public/              # Arquivos estáticos
├── src/
│   ├── components/      # Componentes reutilizáveis (SearchBar, WeatherCard, MiniMap, etc.)
│   ├── services/        # Integração com APIs externas (weatherService.js)
│   ├── ThemeContext.js  # Gerenciamento de tema (Light/Dark)
│   ├── Home.js          # Página de boas-vindas com relógio e notícias
│   ├── App.js           # Página principal de busca e previsão
│   └── index.js         # Ponto de entrada da aplicação
├── .env                 # Variáveis de ambiente (API Key)
└── tailwind.config.js   # Configurações do Tailwind
```

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado.
- Uma chave de API gratuita do [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lfaz3245/ClimaAgora-SitedePrevis-odoTempo-.git
   cd ClimaAgora-SitedePrevis-odoTempo-/clima-dashboard
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `clima-dashboard/` e adicione sua chave:
   ```env
   REACT_APP_WEATHER_API_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

5. **Acesse no navegador:**
   [http://localhost:3000](http://localhost:3000)

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte de um portfólio pessoal para demonstrar habilidades em:
- Consumo e tratamento de dados de APIs REST.
- Gerenciamento de estado complexo e efeitos colaterais com Hooks (`useState`, `useEffect`).
- Criação de layouts modernos e responsivos com TailwindCSS.
- Implementação de UX/UI intuitiva com feedback visual para o usuário.



Desenvolvido com 💙 por [Kennedy](https://github.com/lfaz3245).
