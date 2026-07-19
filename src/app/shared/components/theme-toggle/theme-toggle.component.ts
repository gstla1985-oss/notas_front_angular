import { Component, inject, signal } from '@angular/core';
import { ThemeService, THEME_OPTIONS } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <div class="theme-selector-wrapper">
      <!-- Botón principal -->
      <button
        (click)="togglePanel()"
        class="theme-toggle-btn"
        [title]="'Cambiar tema'"
      >
        <span class="theme-icon">{{ currentOption().emoji }}</span>
        <span class="theme-label">{{ currentOption().label }}</span>
        <span class="chevron" [class.open]="panelOpen()">▾</span>
      </button>

      <!-- Panel de selección -->
      @if (panelOpen()) {
        <div class="theme-panel" (click)="$event.stopPropagation()">
          <p class="panel-title">Elige tu tema</p>
          @for (option of themes; track option.name) {
            <button
              class="theme-option"
              [class.active]="themeService.currentTheme() === option.name"
              [attr.data-theme-preview]="option.name"
              (click)="selectTheme(option.name)"
            >
              <span class="option-emoji">{{ option.emoji }}</span>
              <span class="option-info">
                <span class="option-label">{{ option.label }}</span>
                <span class="option-desc">{{ option.description }}</span>
              </span>
              @if (themeService.currentTheme() === option.name) {
                <span class="check">✓</span>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .theme-selector-wrapper {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .theme-toggle-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 24px;
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      color: var(--text-accent);
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-card);
    }

    .theme-toggle-btn:hover {
      transform: scale(1.04);
      border-color: var(--accent);
    }

    .theme-icon { font-size: 16px; }
    .theme-label { letter-spacing: 0.5px; }

    .chevron {
      font-size: 12px;
      transition: transform 0.25s ease;
      display: inline-block;
    }
    .chevron.open { transform: rotate(180deg); }

    /* ---- Panel ---- */
    .theme-panel {
      background: var(--bg-card);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 12px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 200px;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .panel-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 2px 6px 6px;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 2px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      text-align: left;
      width: 100%;
    }

    .theme-option:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-color);
    }

    .theme-option.active {
      background: var(--bg-selected);
      border-color: var(--accent);
    }

    .option-emoji { font-size: 18px; flex-shrink: 0; }

    .option-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .option-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .option-desc {
      font-size: 11px;
      color: var(--text-muted);
    }

    .check {
      font-size: 14px;
      font-weight: 700;
      color: var(--accent);
      flex-shrink: 0;
    }
  `],
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly themes = THEME_OPTIONS;
  protected readonly panelOpen = signal(false);

  protected get currentOption() {
    return () => this.themes.find(t => t.name === this.themeService.currentTheme()) ?? this.themes[0];
  }

  protected togglePanel(): void {
    this.panelOpen.update(v => !v);
  }

  protected selectTheme(name: Parameters<typeof this.themeService.setTheme>[0]): void {
    this.themeService.setTheme(name);
    this.panelOpen.set(false);
  }
}
