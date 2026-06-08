export const colors = {
  background: '#0a0a1a',
  card: '#12122a',
  accent: '#f4a500',
  text: '#ffffff',
  subtext: '#aaaacc',
  danger: '#ff4444',
  border: '#1e1e3a',
  success: '#44cc88',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: { fontSize: 20, fontWeight: '700' as const, color: colors.text },
  subtitle: { fontSize: 16, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 14, fontWeight: '400' as const, color: colors.text },
  caption: { fontSize: 12, fontWeight: '400' as const, color: colors.subtext },
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
};
