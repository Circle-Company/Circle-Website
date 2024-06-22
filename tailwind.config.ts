import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#EEEEEE', // Cor principal (por exemplo, para títulos)
        action: '#1977F3', // Cor para botões de ação
        actionHover: '#10518E', // Cor para botões de ação
        homeBackground: '#000000', // Cor de fundo da home
        footerBackground: '#212121', // Cor de fundo do footer
        subHeadline: '#86868B',
        description: '#3D3D3D', // Cor das descrições
        legend: '#F5F5F7',
        footerText: '#D4D4D4', // Cor do botão do rodapé
      },
      fontSize: {
        '50px': '50px',
        '20px': '20px',
        '16px': '16px',
        '12px': '12px',
        '10px': '10px',
      },
      spacing: {
        '54': '54px',
        '44': '44px',
        '4': '4px',
        '18': '18px',
        '24': '24px',
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
