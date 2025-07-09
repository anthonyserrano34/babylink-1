/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nubernext': ['NuberNext', 'IBM Plex Sans', 'sans-serif'],
        'nubernext-extended': ['NuberNext Extended', 'NuberNext', 'IBM Plex Sans', 'sans-serif'],
        'nubernext-wide': ['NuberNext Wide', 'NuberNext', 'IBM Plex Sans', 'sans-serif'],
        'nubernext-condensed': ['NuberNext Condensed', 'NuberNext', 'IBM Plex Sans', 'sans-serif'],
        'monument': ['Monument Extended Regular', 'Inter', 'sans-serif'],
        'sharp-sans': ['Sharp Sans Extrabold', 'IBM Plex Sans', 'sans-serif'],
      },
      fontWeight: {
        'heavy': '900',
      },
    },
  },
  plugins: [],
  safelist: [
    'font-nubernext',
    'font-nubernext-extended', 
    'font-nubernext-wide',
    'font-nubernext-condensed',
    'font-heavy',
    'font-bold',
  ],
};

export default config; 