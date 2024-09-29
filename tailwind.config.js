/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom Color Palette
        primaryTxt: "#1A202C", // Darker gray for text
        primaryMat: "#4FD1C5", // Teal for primary material
        borderColor: "#CBD5E0", // Light gray for border
        borderDark: "#4A5568", // Dark gray for dark mode border
        // New Colors
        border: "hsl(215, 16%, 27%)", // Desaturated blue
        input: "hsl(200, 15%, 90%)", // Light gray for input
        ring: "hsl(210, 36%, 96%)", // Off-white ring
        background: "hsl(0, 0%, 98%)", // Almost white background
        foreground: "hsl(210, 22%, 49%)", // Gray for foreground text
        primary: {
          DEFAULT: "hsl(218, 44%, 22%)", // Dark blue for primary
          foreground: "hsl(218, 28%, 95%)", // Light blue for primary foreground
        },
        secondary: {
          DEFAULT: "hsl(204, 86%, 53%)", // Vivid blue for secondary
          foreground: "hsl(210, 22%, 95%)", // Light gray for secondary foreground
        },
        destructive: {
          DEFAULT: "hsl(348, 83%, 47%)", // Bright red for destructive action
          foreground: "hsl(0, 0%, 100%)", // White foreground for destructive
        },
        muted: {
          DEFAULT: "hsl(210, 22%, 49%)", // Muted gray
          foreground: "hsl(210, 15%, 98%)", // Very light gray foreground
        },
        accent: {
          DEFAULT: "hsl(171, 73%, 46%)", // Bright teal for accent
          foreground: "hsl(171, 15%, 98%)", // Light teal foreground
        },
        popover: {
          DEFAULT: "hsl(200, 15%, 90%)", // Light gray for popovers
          foreground: "hsl(210, 22%, 49%)", // Dark gray for popover foreground
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)", // White for cards
          foreground: "hsl(210, 22%, 49%)", // Gray for card text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
