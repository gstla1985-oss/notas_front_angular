import { Injectable, signal, effect } from '@angular/core';

export type ThemeName = 'amethyst' | 'ruby' | 'opalo' | 'zafiro';

export interface ThemeOption {
  name: ThemeName;
  label: string;
  emoji: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { name: 'amethyst', label: 'Amatista', emoji: '💎', description: 'Grape Amethyst' },
  { name: 'ruby',     label: 'Ruby',     emoji: '♦️', description: 'Cherry Ruby' },
  { name: 'opalo',    label: 'Ópalo',    emoji: '🪨', description: 'Chocolate Opal' },
  { name: 'zafiro',   label: 'Zafiro',   emoji: '🔷', description: 'Sapphire Night' },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly currentTheme = signal<ThemeName>('amethyst');

  constructor() {
    const saved = localStorage.getItem('komodo-theme') as ThemeName | null;
    if (saved === 'amethyst' || saved === 'ruby' || saved === 'opalo' || saved === 'zafiro') {
      this.currentTheme.set(saved);
    }

    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem('komodo-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  setTheme(theme: ThemeName): void {
    this.currentTheme.set(theme);
  }

  /** Cicla al siguiente tema: amethyst → ruby → opalo → zafiro → amethyst */
  toggleTheme(): void {
    this.currentTheme.update((t) => {
      if (t === 'amethyst') return 'ruby';
      if (t === 'ruby') return 'opalo';
      if (t === 'opalo') return 'zafiro';
      return 'amethyst';
    });
  }
}
