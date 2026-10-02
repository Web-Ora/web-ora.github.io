/* =====================================================================
   WebOra . configurazione Tailwind per il CDN (nessun build step)

   Va caricata DOPO lo script del CDN:
     <script src="https://cdn.tailwindcss.com"></script>
     <script src="tailwind-config.js"></script>

   Tailwind qui è solo un livello di utilità per layout e spaziature.
   Il sistema visivo vero (vetro, bordi, tipografia, animazioni) sta in
   styles.css come CSS reale, così le pagine restano corrette anche
   prima che il CDN abbia finito di compilare.

   Per la produzione definitiva: `npx tailwindcss -o tw.css --minify`
   e sostituire il tag del CDN con il file compilato.
   ===================================================================== */

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* tela scura e vetro, accenti presi dal logo WebOra */
        midnight: '#040806',
        steel: '#1d2a24',
        fog: '#9fb0a7',
        mist: '#c6d4cd',
        frost: '#e3ece7',
        ice: '#ffffff',
        /* unico accento cromatico della pagina: il verde del marchio */
        brand: {
          DEFAULT: '#10b981',
          hi: '#34d399',
          soft: '#6ee7b7',
          lo: '#0d9668',
          ink: '#04150e'
        },
        glass: {
          /* superfici traslucide */
          1: 'rgba(214,247,232,0.03)',
          2: 'rgba(214,247,232,0.06)',
          3: 'rgba(206,232,219,0.12)',
          deep: 'rgba(4,8,6,0.97)'
        },
        hairline: 'rgba(214,247,232,0.12)',
        gridline: 'rgba(214,247,232,0.06)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Instrument Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        /* scala AuthKit */
        caption: ['12px', { lineHeight: '1.33' }],
        'body-sm': ['14px', { lineHeight: '1.43' }],
        body: ['16px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        subheading: ['18px', { lineHeight: '1.33' }],
        'heading-sm': ['24px', { lineHeight: '1.17', letterSpacing: '-0.01em' }],
        heading: ['28px', { lineHeight: '1.14' }],
        'heading-lg': ['44px', { lineHeight: '1.16' }],
        display: ['48px', { lineHeight: '1.17' }]
      },
      borderRadius: {
        card: '16px',
        badge: '6px',
        pill: '999px'
      },
      spacing: {
        section: '120px',
        card: '24px'
      },
      maxWidth: {
        page: '1200px',
        measure: '40rem'
      },
      boxShadow: {
        /* elevazione = bordo interno gelato + alone, non drop shadow */
        hairline: 'inset 0 0 0 1px rgba(214,247,232,0.12)',
        'hairline-soft': 'inset 0 0 0 1px rgba(214,247,232,0.06)',
        card:
          'inset 0 1px 1px rgba(206,232,219,0.12), inset 0 24px 48px rgba(206,232,219,0.05), 0 24px 32px rgba(3,7,5,0.7)',
        plate:
          'inset 0 1px 1px rgba(226,250,238,0.2), inset 0 24px 48px rgba(168,245,210,0.06), 0 16px 32px rgba(0,0,0,0.3)',
        halo: '0 0 6px rgba(186,247,214,0.32), 0 0 12px rgba(110,231,183,0.24)',
        brand: '0 0 0 1px rgba(16,185,129,0.5), 0 10px 40px -8px rgba(16,185,129,0.55)'
      },
      backgroundImage: {
        brandwash: 'linear-gradient(180deg, #ffffff 12%, #6ee7b7 100%)',
        'brand-cta': 'linear-gradient(135deg, #eafff6 0%, #5fe3b0 46%, #10b981 100%)'
      }
    }
  }
};
