/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primaryHover: "#1D4ED8",
        background: "#F3F4F6",
        card: "#FFFFFF",

        textPrimary: "#111827",
        textSecondary: "#6B7280",

        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },

      fontSize: {
        pageTitle: "28px",
        sectionTitle: "20px",
        cardTitle: "18px",
        body: "14px",
        small: "12px",
      },

      spacing: {
        page: "24px",
        section: "20px",
        card: "16px",
        element: "12px",
      },

      borderRadius: {
        card: "12px",
        button: "8px",
      },

      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
