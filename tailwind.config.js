const path = require("path");

module.exports = {
  darkMode: "class", // Enables dark mode toggle based on class
  presets: [require("@medusajs/ui-preset")], // Integrates Medusa UI preset
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Path to all JavaScript and TypeScript files in app directory
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Path to all JavaScript and TypeScript files in pages directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Path to all JavaScript and TypeScript files in components directory
    "./src/styles/**/*.css", // Path to all CSS files in styles directory
    "./src/modules/**/*.{js,ts,jsx,tsx}", // Path to all JavaScript and TypeScript files in modules directory
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}", // Includes UI components from Medusa
  ],
  theme: {
    extend: {
      fontFamily: {
        'elegant': ['"Open Sans"', 'sans-serif'], // Custom font family named 'elegant'
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        'pastel-pink': '#E38F90', // Custom pink color
        'slate-gray': '#333940', // Custom slate gray color
        'darker-slate-gray': '#1A1A1A', // Custom darker slate gray color
        'primary-green': '#3cb043', // Custom primary green color
      },
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right": "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top": "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open": "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close": "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()], // Plugin for enhancing UI components with Radix
}
