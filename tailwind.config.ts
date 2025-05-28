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
        "gradient-smooth": "linear-gradient(var(--tw-gradient-stops))",
        "gradient-smooth-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "gradient-smooth-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-smooth-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))",
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
        'gradient-start': '#ffffff',
        'gradient-mid': '#f3f4f6',
        'gradient-end': '#9ca3af',
        'gradient-dark-start': '#000000',
        'gradient-dark-mid': '#0f0f0f',
        'gradient-dark-end': '#1f1f1f',
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
      screens: {
        'high-dpi': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
        'retina': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx)' },
      },
      gradientColorStops: {
        'smooth-white': '#ffffff',
        'smooth-gray-100': '#f7fafc',
        'smooth-gray-200': '#edf2f7',
        'smooth-gray-300': '#e2e8f0',
        'smooth-gray-400': '#cbd5e0',
        'smooth-gray-500': '#a0aec0',
        'smooth-black': '#000000',
        'smooth-gray-900': '#1a202c',
        'smooth-gray-800': '#2d3748',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.force-32bit': {
          '-webkit-color-depth': '32',
          'color-depth': '32',
          '-webkit-transform': 'translate3d(0, 0, 0)',
          'transform': 'translate3d(0, 0, 0)',
          'will-change': 'transform',
          '-webkit-backface-visibility': 'hidden',
          'backface-visibility': 'hidden',
        },
        '.gradient-quality': {
          '-webkit-color-depth': '32',
          'color-depth': '32',
          '-webkit-transform': 'translate3d(0, 0, 0)',
          'transform': 'translate3d(0, 0, 0)',
          'will-change': 'transform, opacity',
          '-webkit-backface-visibility': 'hidden',
          'backface-visibility': 'hidden',
          '-webkit-perspective': '1000px',
          'perspective': '1000px',
        },
        '.text-gradient-quality': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
          '-webkit-color-depth': '32',
          'color-depth': '32',
          '-webkit-transform': 'translate3d(0, 0, 0)',
          'transform': 'translate3d(0, 0, 0)',
          'will-change': 'transform',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
export default config;
