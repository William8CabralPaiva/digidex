export const theme = {
  colors: {
    background: '#080D18',
    panel: '#0a1a36',
    panelAlt: '#0d2447',
    border: '#1e5bd6',
    cyan: '#00f0ff',
    yellow: '#ffd21f',
    text: '#ffffff',
    muted: '#9fb3d9',
    danger: '#ff4d6d',
  },
  attributes: {
    Data: '#2fa8ff',
    Vaccine: '#ff7a2f',
    Virus: '#a35bff',
    Free: '#37d67a',
    Variable: '#ffd21f',
    Unknown: '#8895b3',
  } as Record<string, string>,
  fonts: {
    title: "'Orbitron', sans-serif",
    body: "'Rajdhani', sans-serif",
  },
  breakpoints: {
    tablet: '900px',
    mobile: '600px',
  },
};

export type AppTheme = typeof theme;
