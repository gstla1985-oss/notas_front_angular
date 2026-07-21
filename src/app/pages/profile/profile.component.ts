import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="profile-container">
      <!-- Crystals decorativos -->
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -3s;"></div>

      <div class="profile-card glass animate-fade-in-up">

        <!-- Header -->
        <div class="card-header">
          <button class="back-btn" (click)="goBack()" title="Volver">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h1 class="card-title">Mi Cuenta</h1>
        </div>

        <!-- Avatar / info usuario -->
        <div class="user-section">
          <div class="avatar">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <div class="user-info">
            <span class="user-label">Cuenta activa</span>
            <span class="user-email">{{ authService.getEmail() }}</span>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- Cambiar contraseña -->
        <div class="change-password-section">
          <h2 class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Cambiar Contraseña
          </h2>

          @if (successMsg()) {
            <div class="alert alert-success animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {{ successMsg() }}
            </div>
          }

          @if (errorMsg()) {
            <div class="alert alert-error animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMsg() }}
            </div>
          }

          <div class="form-group">
            <label class="form-label">Contraseña actual</label>
            <div class="input-wrapper">
              <input
                [type]="showCurrent() ? 'text' : 'password'"
                class="input-field"
                placeholder="••••••••"
                [(ngModel)]="currentPassword"
                [disabled]="loading()"
              >
              <button class="eye-btn" type="button" (click)="showCurrent.update(v => !v)">
                @if (showCurrent()) {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                } @else {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Nueva contraseña</label>
            <div class="input-wrapper">
              <input
                [type]="showNew() ? 'text' : 'password'"
                class="input-field"
                placeholder="••••••••"
                [(ngModel)]="newPassword"
                [disabled]="loading()"
              >
              <button class="eye-btn" type="button" (click)="showNew.update(v => !v)">
                @if (showNew()) {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                } @else {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Confirmar nueva contraseña</label>
            <div class="input-wrapper">
              <input
                [type]="showConfirm() ? 'text' : 'password'"
                class="input-field"
                placeholder="••••••••"
                [(ngModel)]="confirmPassword"
                [disabled]="loading()"
              >
              <button class="eye-btn" type="button" (click)="showConfirm.update(v => !v)">
                @if (showConfirm()) {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                } @else {
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <button
            class="btn-primary submit-btn"
            (click)="changePassword()"
            [disabled]="loading() || !currentPassword || !newPassword || !confirmPassword"
          >
            @if (loading()) {
              <span class="spinner"></span>
              Cambiando...
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Cambiar Contraseña
            }
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      min-height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .crystal {
      position: absolute;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
      opacity: 0.12;
      filter: blur(60px);
      pointer-events: none;
    }
    .crystal-top-right { top: -250px; right: -250px; }
    .crystal-bottom-left { bottom: -250px; left: -250px; }

    .profile-card {
      width: 100%;
      max-width: 480px;
      border-radius: 28px;
      border: 1px solid var(--border-card);
      box-shadow: var(--shadow-card);
      padding: 32px;
      z-index: 10;
      background: var(--bg-form-card);
    }

    /* Header */
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 28px;
    }
    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .back-btn:hover {
      background: var(--bg-card-hover);
      color: var(--accent);
      border-color: var(--accent);
    }
    .card-title {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0;
    }

    /* User section */
    .user-section {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border-radius: 18px;
      background: var(--bg-selected);
      border: 1px solid var(--border-color);
      margin-bottom: 24px;
    }
    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary, var(--accent)));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
      opacity: 0.9;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .user-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
    }
    .user-email {
      font-size: 15px;
      font-weight: 700;
      color: var(--accent);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .section-divider {
      height: 1px;
      background: var(--border-color);
      margin-bottom: 24px;
    }

    /* Change password section */
    .change-password-section { display: flex; flex-direction: column; gap: 0; }
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 18px;
    }

    /* Alerts */
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .alert-success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
    }
    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
    }

    /* Form */
    .form-group { margin-bottom: 16px; }
    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-secondary);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-field {
      width: 100%;
      padding: 12px 44px 12px 14px;
      border-radius: 14px;
      font-size: 14px;
    }
    .eye-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      transition: color 0.2s;
    }
    .eye-btn:hover { color: var(--accent); }

    .submit-btn {
      width: 100%;
      margin-top: 8px;
      padding: 14px;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Spinner */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 600px) {
      .profile-card { padding: 24px 20px; }
    }
  `]
})
export class ProfileComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  loading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  goBack(): void {
    this.router.navigate(['/home']);
  }

  changePassword(): void {
    this.successMsg.set('');
    this.errorMsg.set('');

    if (this.newPassword !== this.confirmPassword) {
      this.errorMsg.set('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (this.newPassword.length < 6) {
      this.errorMsg.set('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.loading.set(true);
    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.successMsg.set(res.message || '¡Contraseña cambiada exitosamente!');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.';
        this.errorMsg.set(msg);
      }
    });
  }
}
