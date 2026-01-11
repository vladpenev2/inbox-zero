const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
/* eslint-disable max-len */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionTimingFunction: {
        "back-out": "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-200% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration) linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-geist)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        title: ["var(--font-title)", ...fontFamily.sans],
      },
      colors: {
        // shadcn/ui - TweakCN tangerine theme (oklch colors)
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Semantic colors
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
          muted: "var(--success-muted)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
          muted: "var(--warning-muted)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
          muted: "var(--info-muted)",
        },
        error: {
          DEFAULT: "var(--error)",
          foreground: "var(--error-foreground)",
          muted: "var(--error-muted)",
        },
        // TODO: rename
        new: {
          purple: {
            50: "#F3EAFE",
            100: "#E7DAFF",
            200: "#E1D5FC",
            300: "#D7C3FC",
            600: "#6410FF",
          },
          green: {
            50: "#F3FFEF",
            100: "#E1FFD8",
            150: "#DDF4D3",
            200: "#CFF4C0",
            500: "#30A24B",
            600: "#17A34A",
          },
          blue: {
            50: "#EFF6FF",
            100: "#D8E9FF",
            150: "#D6E8FC",
            200: "#C3DEFC",
            600: "#006EFF",
          },
          indigo: {
            50: "#EFF3FF",
            100: "#D9E2FF",
            150: "#D5DEFC",
            200: "#C2D0FC",
            600: "#124DFF",
          },
          pink: {
            50: "#FFEEF8",
            100: "#FFDAEC",
            150: "#FDD3EB",
            200: "#FDBFE0",
            500: "#C942B2",
          },
          orange: {
            50: "#FFF5EF",
            100: "#FFE7DA",
            150: "#FCE2D5",
            200: "#FCD6C2",
            600: "#E65707",
          },
          yellow: {
            50: "#FFFBEF",
            100: "#FFF3DA",
            150: "#E7E0CB",
            200: "#E7DBB9",
            500: "#D8A40C",
          },
          brown: {
            50: "#FEEDE0",
            100: "#F8E0CC",
            150: "#EFDFD3",
            200: "#E9D1BE",
            500: "#CC762F",
          },
          red: {
            50: "#FFEEF0",
            100: "#FFDADB",
            150: "#FDD3D4",
            200: "#FCC0C0",
            500: "#C94244",
          },
          cyan: {
            50: "#FEFFFF",
            100: "#E5F9FF",
            200: "#D0F4FF",
            500: "#49D1FA",
          },
          gray: {
            50: "#FFFFFF",
            100: "#F6F6F6",
            150: "#EEEEEE",
            200: "#E6E6E6",
            500: "#8E8E8E",
            600: "#525252",
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/typography"),
  ],
};
