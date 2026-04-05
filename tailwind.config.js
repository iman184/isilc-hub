/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0f1117',
          card: '#161b27',
          muted: '#1a2030',
        },
        border: { DEFAULT: '#1e2536' },
        brand: {
          DEFAULT: '#6172f3',
          dark: '#4a4de7',
          light: '#a5bbfc',
        },
        text: {
          DEFAULT: '#f1f5f9',
          muted: '#94a3b8',
          dim: '#64748b',
          faint: '#475569',
        },
      },
      fontFamily: {
        sans: ["'Segoe UI'", 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pop: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.9)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both',
        fadeIn: 'fadeIn 0.4s ease both',
        slideLeft: 'slideLeft 0.55s cubic-bezier(0.22,1,0.36,1) both',
        pop: 'pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        blink: 'blink 2s infinite',
        countUp: 'countUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}


