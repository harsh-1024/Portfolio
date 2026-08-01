// src/hooks/useTheme.ts

import { useTheme as useThemeContext } from '@/providers/ThemeProvider';

export function useTheme() {
  return useThemeContext();
}