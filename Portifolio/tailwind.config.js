module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F1624",
        "primary-dark": "#0a0e18",
        "primary-light": "#1a2238",
        secondary: "#f8fafc",
        light: "#ffffff",
        gray: "#64748b",
        "dark-gray": "#334155",
        accent: "#00D1FF",
        success: "#10b981",
      },
      boxShadow: {
        DEFAULT: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
      transitionProperty: {
        DEFAULT: "all 0.3s ease",
      }
    },
  },
  plugins: [],
}
