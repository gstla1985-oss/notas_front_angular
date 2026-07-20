import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, FormsModule],
  template: `
    <app-theme-toggle />

    <div class="forgot-container">
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -2s;"></div>

      <div class="forgot-content animate-fade-in-up">
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="72" height="66" viewBox="0 0 72 66" fill="none">
              <rect width="72" height="66" rx="18" fill="var(--accent)" />
              <g transform="translate(14, 11) scale(1.85)" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
                <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
                <path d="M2 6h4" />
                <path d="M2 10h4" />
                <path d="M2 14h4" />
                <path d="M2 18h4" />
                <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              </g>
            </svg>
          </div>
          <h1 class="app-name">Komodo Notas</h1>
        </div>

        <div class="form-card glass">
          <h2 class="form-title">Recuperar Contraseña</h2>
          <p class="form-subtitle">Ingresa tu correo para recibir un código de verificación</p>

          <div class="field-group">
            <label class="field-label">Correo electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <input
                type="email"
                class="input-field"
                placeholder="Ingresa tu correo electrónico"
                [(ngModel)]="email"
              />
            </div>
          </div>

          <button class="btn-primary submit-btn" (click)="requestReset()">
            <span class="btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </span>
            Enviar Código
          </button>

          <p class="back-text">
            ¿Recordaste tu contraseña?
            <a routerLink="/login" class="back-link">Volver al login</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    .crystal {
      position: absolute;
      background: radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%);
      opacity: 0.2;
      pointer-events: none;
      filter: blur(50px);
    }
    .crystal-top-right {
      width: 800px;
      height: 800px;
      top: -200px;
      right: -200px;
    }
    .crystal-bottom-left {
      width: 1000px;
      height: 1000px;
      bottom: -300px;
      left: -300px;
    }
    .forgot-content {
      width: 100%;
      max-width: 620px;
      z-index: 1;
    }
    .logo-section {
      text-align: center;
      margin-bottom: 16px;
    }
    .logo-icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 6px;
      filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.1));
    }
    .app-name {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0px;
      letter-spacing: -0.5px;
    }
    .form-card {
      position: relative;
      padding: 40px 48px;
      border-radius: 16px;
      background: var(--bg-form-card);
      border: var(--border-form-card);
      box-shadow: var(--glow-form-card);
      overflow: hidden;
    }
    .form-card::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle at center, var(--accent), transparent 70%);
      opacity: 0.12;
      pointer-events: none;
    }
    .form-title {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .form-subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }
    .field-group {
      margin-bottom: 24px;
    }
    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      z-index: 1;
    }
    .input-field {
      width: 100%;
      padding: 14px 16px 14px 44px;
      border-radius: 12px;
      border: 1.5px solid var(--border-input);
      background: var(--bg-form-input);
      font-size: 15px;
      font-family: 'Inter', sans-serif;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }
    .input-field:focus {
      outline: none;
      border-color: var(--accent);
      background: var(--bg-form-input);
      box-shadow: 0 0 0 3px var(--bg-selected);
    }
    .submit-btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-icon {
      font-size: 18px;
    }
    .back-text {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: var(--text-secondary);
    }
    .back-link {
      color: var(--text-accent);
      font-weight: 600;
      text-decoration: none;
      margin-left: 4px;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    @media (max-width: 480px) {
      .forgot-container {
        padding: 16px;
        align-items: flex-start;
        padding-top: 40px;
      }
      .form-card {
        padding: 24px 20px;
        border-radius: 20px;
      }
    }
  `]
})
export class ForgotPasswordComponent {
  email: string = '';
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  private router = inject(Router);
  private authService = inject(AuthService);

  requestReset() {
    if (!this.email) {
      this.errorMessage.set('Por favor ingresa tu correo electrónico.');
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/verify-otp'], { queryParams: { email: this.email, mode: 'reset' } });
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message || 'Si el correo existe, recibirás un código.';
        this.successMessage.set(msg); // Show as success to avoid email enumeration
      }
    });
  }
}

