tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "#0a0704",
        "base-dim": "#060403",
        surface: "#171009",
        "surface-high": "#20160c",
        "surface-highest": "#2d1e10",
        line: "#3a2413",
        "line-soft": "#2a1a0e",
        fire: "#ff7a1a",
        "fire-light": "#ffa64d",
        "fire-dark": "#c9500a",
        ember: "#ff3b30",
        "ember-dark": "#8f1d16",
        gold: "#ffc247",
        "gold-dark": "#a87317",
        ink: "#fff3e8",
        muted: "#b3a190",
        "muted-dim": "#7a6b5e",
      },
      fontFamily: {
        display: ["Rajdhani", "Cairo", "sans-serif"],
        body: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        fire: "0 0 20px rgba(255,122,26,0.35)",
        "fire-lg": "0 12px 40px rgba(0,0,0,0.75), 0 0 30px rgba(255,122,26,0.18)",
        ember: "0 0 16px rgba(255,59,48,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
};
