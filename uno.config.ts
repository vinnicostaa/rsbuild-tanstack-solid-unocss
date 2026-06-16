import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  },

  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      page: "var(--page)",

      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",

      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      "card-foreground": "var(--card-foreground)",

      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      "popover-foreground": "var(--popover-foreground)",

      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      "primary-foreground": "var(--primary-foreground)",
      "primary-subtle": "var(--primary-subtle)",
      "primary-subtle-foreground": "var(--primary-subtle-foreground)",

      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      "secondary-foreground": "var(--secondary-foreground)",

      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      "accent-foreground": "var(--accent-foreground)",

      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      "muted-foreground": "var(--muted-foreground)",

      overlay: {
        DEFAULT: "var(--overlay)",
        foreground: "var(--overlay-foreground)",
      },
      "overlay-foreground": "var(--overlay-foreground)",

      success: {
        DEFAULT: "var(--success)",
        foreground: "var(--success-foreground)",
      },
      "success-foreground": "var(--success-foreground)",
      "success-subtle": "var(--success-subtle)",
      "success-subtle-foreground": "var(--success-subtle-foreground)",

      info: {
        DEFAULT: "var(--info)",
        foreground: "var(--info-foreground)",
      },
      "info-foreground": "var(--info-foreground)",
      "info-subtle": "var(--info-subtle)",
      "info-subtle-foreground": "var(--info-subtle-foreground)",

      warning: {
        DEFAULT: "var(--warning)",
        foreground: "var(--warning-foreground)",
      },
      "warning-foreground": "var(--warning-foreground)",
      "warning-subtle": "var(--warning-subtle)",
      "warning-subtle-foreground": "var(--warning-subtle-foreground)",

      danger: {
        DEFAULT: "var(--danger)",
        foreground: "var(--danger-foreground)",
      },
      "danger-foreground": "var(--danger-foreground)",
      "danger-subtle": "var(--danger-subtle)",
      "danger-subtle-foreground": "var(--danger-subtle-foreground)",

      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      "destructive-foreground": "var(--destructive-foreground)",
      "destructive-subtle": "var(--destructive-subtle)",
      "destructive-subtle-foreground": "var(--destructive-subtle-foreground)",

      navbar: {
        DEFAULT: "var(--navbar)",
        foreground: "var(--navbar-foreground)",
      },
      "navbar-foreground": "var(--navbar-foreground)",

      sidebar: {
        DEFAULT: "var(--sidebar)",
        foreground: "var(--sidebar-foreground)",
        primary: "var(--sidebar-primary)",
        "primary-foreground": "var(--sidebar-primary-foreground)",
        accent: "var(--sidebar-accent)",
        "accent-foreground": "var(--sidebar-accent-foreground)",
        border: "var(--sidebar-border)",
        ring: "var(--sidebar-ring)",
      },
      "sidebar-foreground": "var(--sidebar-foreground)",
      "sidebar-primary": "var(--sidebar-primary)",
      "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
      "sidebar-accent": "var(--sidebar-accent)",
      "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
      "sidebar-border": "var(--sidebar-border)",
      "sidebar-ring": "var(--sidebar-ring)",

      chart: {
        1: "var(--chart-1)",
        2: "var(--chart-2)",
        3: "var(--chart-3)",
        4: "var(--chart-4)",
        5: "var(--chart-5)",
      },
      "chart-1": "var(--chart-1)",
      "chart-2": "var(--chart-2)",
      "chart-3": "var(--chart-3)",
      "chart-4": "var(--chart-4)",
      "chart-5": "var(--chart-5)",
    },

    font: {
      sans: "var(--font-sans)",
      display: "var(--font-display)",
      mono: "var(--font-mono)",
      brand: "var(--font-brand)",
      accent: "var(--font-accent)",
    },

    radius: {
      DEFAULT: "var(--radius)",
      xs: "var(--radius-xs)",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      "2xl": "var(--radius-2xl)",
      "3xl": "var(--radius-3xl)",
      "4xl": "var(--radius-4xl)",
    },
  },

  shortcuts: {
    "page-wrap": "mx-auto w-full max-w-6xl",
    "site-header":
      "sticky top-0 z-50 border-b [border-color:var(--ui-comp-navbar-border)] [background-color:var(--ui-comp-navbar-bg)] [color:var(--ui-comp-navbar-fg)] backdrop-blur",
    "nav-shell": "flex min-h-16 flex-wrap items-center gap-4 py-3",
    "brand-pill":
      "inline-flex items-center gap-2 [color:var(--ui-comp-navbar-brand-fg)] no-underline transition-colors hover:[color:var(--ui-comp-navbar-brand-hover-fg)]",
    "brand-dot":
      "size-2.5 rounded-full [background-color:var(--ui-comp-navbar-brand-dot-bg)]",
    "brand-muted": "[color:var(--ui-comp-navbar-muted-fg)]",
    "nav-link":
      "rounded-md px-2.5 py-1.5 [color:var(--ui-comp-navbar-link-fg)] no-underline transition-colors hover:[background-color:var(--ui-comp-navbar-link-hover-bg)] hover:[color:var(--ui-comp-navbar-link-hover-fg)]",
    "is-active":
      "[background-color:var(--ui-comp-navbar-link-active-bg)] [color:var(--ui-comp-navbar-link-active-fg)]",
    "display-title": "font-display [color:var(--ui-comp-page-title-fg)]",
    "page-copy": "[color:var(--ui-comp-page-body-fg)]",
    "island-kicker":
      "text-[0.72rem] font-semibold uppercase tracking-[0.18em] [color:var(--ui-comp-page-kicker-fg)]",
    "island-shell":
      "border [border-color:var(--ui-comp-island-border)] [background-color:var(--ui-comp-island-bg)] [color:var(--ui-comp-island-fg)]",
    "feature-card":
      "border [border-color:var(--ui-comp-feature-card-border)] [background-color:var(--ui-comp-feature-card-bg)] [color:var(--ui-comp-feature-card-fg)] transition-colors hover:[border-color:var(--ui-comp-feature-card-hover-border)]",
    "feature-card-description":
      "[color:var(--ui-comp-feature-card-description-fg)]",
    "rise-in": "animate-[app-rise-in_360ms_ease-out_both]",
    "btn-primary":
      "inline-flex items-center justify-center gap-2 rounded-md [background-color:var(--ui-comp-button-primary-bg)] px-4 py-2.5 text-sm font-semibold [color:var(--ui-comp-button-primary-fg)] no-underline transition-colors hover:[background-color:var(--ui-comp-button-primary-hover-bg)] hover:[color:var(--ui-comp-button-primary-hover-fg)] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
    "btn-secondary":
      "inline-flex items-center justify-center gap-2 rounded-md border [border-color:var(--ui-comp-button-secondary-border)] [background-color:var(--ui-comp-button-secondary-bg)] px-4 py-2.5 text-sm font-semibold [color:var(--ui-comp-button-secondary-fg)] no-underline transition-colors hover:[background-color:var(--ui-comp-button-secondary-hover-bg)] hover:[color:var(--ui-comp-button-secondary-hover-fg)] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
    "field-label":
      "text-sm font-semibold [color:var(--ui-comp-field-label-fg)]",
    "field-control":
      "w-full rounded-md border [border-color:var(--ui-comp-input-border)] [background-color:var(--ui-comp-input-bg)] px-3 py-2.5 text-sm [color:var(--ui-comp-input-fg)] outline-none transition-colors placeholder:[color:var(--ui-comp-input-placeholder-fg)] focus:[border-color:var(--ui-comp-input-focus-border)] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
  },

  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),

    presetIcons({
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),

    presetTypography(),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
});
