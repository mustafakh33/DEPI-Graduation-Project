import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        info: "hsl(var(--info))"
      },
      boxShadow: {
        panel: "0 10px 30px rgba(15, 23, 42, 0.08)",
        float: "0 22px 40px rgba(15, 23, 42, 0.12)"
      },
      borderRadius: {
        xl2: "1.5rem"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        arabic: ["var(--font-arabic)"]
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 30%), radial-gradient(circle at top right, rgba(45, 212, 191, 0.12), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,247,251,1))"
      }
    }
  },
  plugins: []
};

export default config;
