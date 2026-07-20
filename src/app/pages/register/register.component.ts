import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, FormsModule],
  template: `
    <app-theme-toggle />
    <div class="register-container">
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -2s;"></div>

      <div class="register-content animate-fade-in-up">
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="72" height="66" viewBox="0 0 72 66" fill="none">
              <rect width="72" height="66" rx="18" fill="var(--accent)" />
              <g transform="translate(14, 11) scale(1.85)" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" />
                <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              </g>
            </svg>
          </div>
          <h1 class="app-name">Komodo Notas</h1>
        </div>

        <div class="form-card glass">
          <h2 class="form-title">Crear cuenta</h2>
          <p class="form-subtitle">Únete y empieza a tomar notas hoy</p>

          @if (errorMessage()) {
            <div class="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {{ errorMessage() }}
            </div>
          }

          <!-- Name -->
          <div class="field-group">
            <label class="field-label">Nombre (opcional)</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
              </span>
              <input id="reg-name" type="text" class="input-field" placeholder="Tu nombre" [(ngModel)]="name" [disabled]="loading()" />
            </div>
          </div>

          <!-- Email -->
          <div class="field-group">
            <label class="field-label">Correo electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </span>
              <input id="reg-email" type="email" class="input-field" placeholder="Ingresa tu correo" [(ngModel)]="email" [disabled]="loading()" />
            </div>
          </div>

          <!-- Password -->
          <div class="field-group">
            <label class="field-label">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              </span>
              <input id="reg-password" [type]="showPassword ? 'text' : 'password'" class="input-field" placeholder="Mínimo 6 caracteres" [(ngModel)]="password" [disabled]="loading()" />
              <button class="toggle-password" type="button" (click)="showPassword = !showPassword">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="field-group">
            <label class="field-label">Confirmar contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              </span>
              <input id="reg-confirm" [type]="showPassword ? 'text' : 'password'" class="input-field" placeholder="Repite tu contraseña" [(ngModel)]="confirmPassword" [disabled]="loading()" (keyup.enter)="doRegister()" />
            </div>
          </div>

          <button id="register-btn" class="btn-primary register-btn" (click)="doRegister()" [disabled]="loading()">
            @if (loading()) {
              <span class="spinner"></span> Creando cuenta...
            } @else {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" y1="8" x2="19" y2="14"></line>
                <line x1="22" y1="11" x2="16" y2="11"></line>
              </svg>
              Crear cuenta
            }
          </button>

          <p class="login-text">
            ¿Ya tienes una cuenta?
            <a routerLink="/login" class="login-link">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container { min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 24px; position: relative; overflow: hidden; }
    .crystal { position: absolute; background: radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%); opacity: 0.2; pointer-events: none; filter: blur(50px); }
    .crystal-top-right { width: 800px; height: 800px; top: -200px; right: -200px; }
    .crystal-bottom-left { width: 1000px; height: 1000px; bottom: -300px; left: -300px; }
    .register-content { width: 100%; max-width: 620px; z-index: 1; }
    .logo-section { text-align: center; margin-bottom: 16px; }
    .logo-icon { display: inline-flex; justify-content: center; align-items: center; margin-bottom: 6px; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.1)); }
    .app-name { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 0; letter-spacing: -0.5px; }
    .form-card { position: relative; padding: 40px 48px; border-radius: 16px; background: var(--bg-form-card); border: var(--border-form-card); box-shadow: var(--glow-form-card); overflow: hidden; }
    .form-card::before { content: ''; position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: radial-gradient(circle at center, var(--accent), transparent 70%); opacity: 0.12; pointer-events: none; }
    .form-title { font-size: 28px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .form-subtitle { font-size: 15px; color: var(--text-secondary); margin-bottom: 20px; }
    .error-banner { display: flex; align-items: center; gap: 8px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 500; margin-bottom: 16px; }
    .field-group { margin-bottom: 16px; }
    .field-label { display: block; font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 16px; display: flex; align-items: center; color: var(--accent); z-index: 1; }
    .input-field { width: 100%; padding: 14px 16px 14px 44px; border-radius: 12px; border: 1.5px solid var(--border-input); background: var(--bg-form-input); font-size: 15px; font-family: 'Inter', sans-serif; color: var(--text-primary); transition: all 0.3s ease; }
    .input-field:disabled { opacity: 0.6; cursor: not-allowed; }
    .input-field:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--bg-selected); }
    .toggle-password { position: absolute; right: 16px; background: none; border: none; cursor: pointer; display: flex; align-items: center; color: var(--accent); opacity: 0.8; transition: opacity 0.2s; }
    .toggle-password:hover { opacity: 1; }
    .register-btn { width: 100%; padding: 13px; border-radius: 10px; font-size: 16px; font-weight: 600; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .register-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .login-text { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-secondary); }
    .login-link { color: var(--text-accent); font-weight: 600; text-decoration: none; margin-left: 4px; }
    .login-link:hover { text-decoration: underline; }
    @media (max-width: 480px) {
      .register-container { padding: 16px; align-items: flex-start; padding-top: 40px; }
      .form-card { padding: 24px 20px; border-radius: 20px; }
      .app-name { font-size: 24px; }
      .crystal { width: 200px; height: 200px; }
    }
  `],
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = signal(false);
  errorMessage = signal('');

  doRegister(): void {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage.set('Por favor completa los campos obligatorios.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.email, this.password, this.name || undefined).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/verify-otp'], { queryParams: { email: this.email, mode: 'registration' } });
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message || 'Error al crear la cuenta. Intenta de nuevo.';
        this.errorMessage.set(msg);
      }
    });
  }
}
