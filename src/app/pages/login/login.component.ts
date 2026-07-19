import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent],
  template: `
    <app-theme-toggle />

    <div class="login-container">
      <!-- Crystal decorations -->
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -2s;"></div>

      <div class="login-content animate-fade-in-up">
        <!-- Logo -->
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="72" height="66" viewBox="0 0 72 66" fill="none">
              <!-- Fondo dinámico con bordes redondeados (Más 'cuadrado' y menos alto) -->
              <rect width="72" height="66" rx="18" fill="var(--accent)" />
              
              <!-- Ícono Notebook con Lápiz (centrado en 72x66) -->
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

        <!-- Form Card -->
        <div class="form-card glass">
          <h2 class="form-title">Iniciar sesión</h2>
          <p class="form-subtitle">Accede a tu cuenta para continuar</p>

          <!-- Email -->
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
              />
            </div>
          </div>

          <!-- Password -->
          <div class="field-group">
            <label class="field-label">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </span>
              <input
                type="password"
                class="input-field"
                placeholder="Ingresa tu contraseña"
              />
              <button class="toggle-password" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="options-row">
            <label class="checkbox-label">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a routerLink="/forgot-password" class="forgot-link">¿Olvidaste tu contraseña?</a>
          </div>

          <!-- Login Button -->
          <button class="btn-primary login-btn" (click)="goToHome()">
            <span class="btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>
            Iniciar sesión
          </button>



          <!-- Register Link -->
          <p class="register-text">
            ¿No tienes una cuenta?
            <a routerLink="/register" class="register-link">Crear cuenta</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }

    /* Crystals (Background Glow) */
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

    .login-content {
      width: 100%;
      max-width: 620px;
      z-index: 1;
    }

    /* Logo */
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

    .app-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      letter-spacing: 0.1px;
    }

    /* Form Card */
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
      margin-bottom: 16px;
    }
    
    .field-group:last-of-type {
      margin-bottom: 10px;
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

    .toggle-password {
      position: absolute;
      right: 16px;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      opacity: 0.8;
      transition: all 0.2s ease;
    }

    .toggle-password:hover {
      opacity: 1;
    }

    /* Options */
    .options-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-size: 13px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      appearance: none;
      width: 16px;
      height: 16px;
      border: 1.5px solid var(--border-input);
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .checkbox-label input[type="checkbox"]:checked {
      background-color: var(--accent);
      border-color: var(--accent);
    }

    .checkbox-label input[type="checkbox"]:checked::after {
      content: '✔';
      color: white;
      font-size: 10px;
    }

    .forgot-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    /* Login Button */
    .login-btn {
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

    /* Divider */
    .divider {
      display: flex;
      align-items: center;
      margin: 16px 0;
      gap: 12px;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(139, 92, 246, 0.2);
    }

    .divider span {
      font-size: 13px;
      color: #64748B;
      white-space: nowrap;
    }

    /* Google Button */
    .google-btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(139, 92, 246, 0.25);
      background: #FFFFFF;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      color: #1E1B4B;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s ease;
    }
    
    .google-btn:hover {
      background: #F8F6FF;
      border-color: var(--accent);
    }

    .google-icon {
      font-size: 18px;
      font-weight: 700;
      background: linear-gradient(135deg, #4285F4, #EA4335, #FBBC04, #34A853);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Register */
    .register-text {
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: var(--text-secondary);
    }

    .register-link {
      color: var(--text-accent);
      font-weight: 600;
      text-decoration: none;
      margin-left: 4px;
    }

    .register-link:hover {
      text-decoration: underline;
    }

    /* Mobile */
    @media (max-width: 480px) {
      .login-container {
        padding: 16px;
        align-items: flex-start;
        padding-top: 40px;
      }

      .form-card {
        padding: 24px 20px;
        border-radius: 20px;
      }

      .app-name {
        font-size: 24px;
      }

      .crystal {
        width: 200px;
        height: 200px;
      }
    }
  `],
})
export class LoginComponent {
  private readonly router = inject(Router);

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
