document.documentElement.classList.add('js');

tailwind.config = {
  theme: {
    extend: {
      colors: {
        paper: '#F7F6F2',
        ink: '#0F1115',
        line: '#E4E2DC',
        mute: '#5B5F6B',
        blue: { DEFAULT: '#1D3BFF', deep: '#00267F', sky: '#E7ECFF' },
        gold: { DEFAULT: '#FFC726', cream: '#FFF4D1' }
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.045em'
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,17,21,0.04), 0 8px 24px -12px rgba(15,17,21,0.12)',
        lift: '0 2px 4px rgba(15,17,21,0.05), 0 24px 48px -20px rgba(29,59,255,0.35)'
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } }
      },
      animation: {
        marquee: 'marquee 32s linear infinite'
      }
    }
  }
};
