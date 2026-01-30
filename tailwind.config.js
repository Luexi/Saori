/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Colores del mockup Saori
                "primary": "#295570",
                "primary-light": "#3a7a9e",
                "primary-dark": "#1e3f54",

                // Backgrounds
                "background-light": "#f9fafb",
                "background-dark": "#22262a",

                // Surfaces (cards, sidebars)
                "surface-light": "#ffffff",
                "surface-dark": "#2d3339",

                // Text
                "text-primary-light": "#131516",
                "text-secondary-light": "#6b7880",
                "text-primary-dark": "#f3f4f6",
                "text-secondary-dark": "#9ca3af",
            },
            fontFamily: {
                "display": ["Manrope", "system-ui", "sans-serif"],
            },
            boxShadow: {
                "floating": "0px 4px 16px rgba(0, 0, 0, 0.08)",
                "soft": "0 2px 8px rgba(0,0,0,0.04)",
            },
        },
    },
    plugins: [],
}
