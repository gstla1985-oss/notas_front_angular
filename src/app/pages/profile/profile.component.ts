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
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -3s;"></div>

      <div class="wa-layout glass animate-fade-in-up">
        
        <!-- SIDEBAR (Desktop Only) -->
        <aside class="wa-sidebar hide-on-mobile">
          <div class="sidebar-header">
            <button class="back-btn" (click)="goBack()" title="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h1 class="sidebar-title">Configuración</h1>
          </div>

          <div class="sidebar-user-card" [class.active]="activeTab() === 'info'" (click)="activeTab.set('info')">
            <div class="avatar-small">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
            <div class="user-details">
              <span class="user-name">Mi Cuenta</span>
              <span class="user-email-text">{{ authService.getEmail() }}</span>
            </div>
          </div>

          <div class="sidebar-menu">
            <button class="sidebar-menu-item" [class.active]="activeTab() === 'security'" (click)="activeTab.set('security')">
              <div class="menu-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="menu-text">
                <span class="menu-title">Notificaciones de seguridad</span>
                <span class="menu-subtitle">Cambiar contraseña</span>
              </div>
            </button>
          </div>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="wa-main">
          
          <!-- Mobile Header (Hidden on Desktop) -->
          <div class="mobile-header hide-on-desktop">
            <button class="back-btn" (click)="goBack()" title="Volver">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <h1 class="sidebar-title">Mi Cuenta</h1>
          </div>

          <div class="main-content-scroll">
            
            <!-- INFO SECTION -->
            <div class="content-section" [class.hide-on-desktop]="activeTab() !== 'info'">
              <!-- This acts as the big header in WhatsApp settings -->
              <div class="info-large-card">
                <div class="avatar-large">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div>
                <div class="info-large-text">
                  <h2 class="info-email">{{ authService.getEmail() }}</h2>
                  <p class="info-status">Cuenta activa</p>
                </div>
              </div>

              <!-- Empty state for desktop info tab, or some decorative element -->
              <div class="wa-empty-state hide-on-mobile">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="var(--border-color)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                <p>Gestiona la configuración de tu cuenta</p>
              </div>
            </div>

            <!-- Mobile Divider -->
            <div class="mobile-divider hide-on-desktop"></div>

            <!-- SECURITY SECTION -->
            <div class="content-section" [class.hide-on-desktop]="activeTab() !== 'security'">
              <div class="security-container">
                
                <!-- Desktop title inside main content -->
                <h2 class="section-title hide-on-mobile">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Cambiar Contraseña
                </h2>

                <!-- Mobile title -->
                <h2 class="section-title hide-on-desktop" style="margin-top: 16px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Cambiar Contraseña
                </h2>

                @if (successMsg()) {
                  <div class="alert alert-success animate-fade-in">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {{ successMsg() }}
                  </div>
                }

                @if (errorMsg()) {
                  <div class="alert alert-error animate-fade-in">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {{ errorMsg() }}
                  </div>
                }

                <div class="form-group">
                  <label class="form-label">Contraseña actual</label>
                  <div class="input-wrapper">
                    <input [type]="showCurrent() ? 'text' : 'password'" class="input-field" placeholder="••••••••" [(ngModel)]="currentPassword" [disabled]="loading()">
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
                    <input [type]="showNew() ? 'text' : 'password'" class="input-field" placeholder="••••••••" [(ngModel)]="newPassword" [disabled]="loading()">
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
                    <input [type]="showConfirm() ? 'text' : 'password'" class="input-field" placeholder="••••••••" [(ngModel)]="confirmPassword" [disabled]="loading()">
                    <button class="eye-btn" type="button" (click)="showConfirm.update(v => !v)">
                      @if (showConfirm()) {
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      } @else {
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>

                <button class="btn-primary submit-btn" (click)="changePassword()" [disabled]="loading() || !currentPassword || !newPassword || !confirmPassword">
                  @if (loading()) {
                    <span class="spinner"></span>
                    Cambiando...
                  } @else {
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Cambiar Contraseña
                  }
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      height: 100vh;
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

    /* LAYOUT BASE (Desktop) */
    .wa-layout {
      width: 100%;
      max-width: 1200px;
      height: 100%;
      max-height: 850px;
      border-radius: 32px;
      border: 1px solid var(--border-card);
      box-shadow: var(--shadow-card);
      display: flex;
      overflow: hidden;
      z-index: 10;
    }

    /* SIDEBAR */
    .wa-sidebar {
      width: 320px;
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.05);
    }
    .sidebar-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    .sidebar-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0;
    }
    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s;
    }
    .back-btn:hover {
      background: var(--bg-card-hover);
      color: var(--accent);
      border-color: var(--accent);
    }

    .sidebar-user-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      cursor: pointer;
      border-bottom: 1px solid var(--border-color);
      transition: background 0.2s;
    }
    .sidebar-user-card:hover {
      background: var(--bg-card-hover);
    }
    .sidebar-user-card.active {
      background: var(--bg-selected);
      border-left: 4px solid var(--accent);
      padding-left: 16px;
    }
    .avatar-small {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary, var(--accent)));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }
    .user-details {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .user-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .user-email-text {
      font-size: 13px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-menu {
      flex: 1;
      padding: 12px 0;
      overflow-y: auto;
    }
    .sidebar-menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 16px 20px;
      background: transparent;
      border: none;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
    }
    .sidebar-menu-item:hover {
      background: var(--bg-card-hover);
    }
    .sidebar-menu-item.active {
      background: var(--bg-selected);
      border-left: 4px solid var(--accent);
      padding-left: 16px;
    }
    .menu-icon {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sidebar-menu-item.active .menu-icon {
      color: var(--accent);
    }
    .menu-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .menu-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .sidebar-menu-item.active .menu-title {
      color: var(--accent);
    }
    .menu-subtitle {
      font-size: 12px;
      color: var(--text-secondary);
    }

    /* MAIN CONTENT */
    .wa-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: transparent;
    }
    .main-content-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .content-section {
      width: 100%;
      max-width: 480px;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* Info View elements */
    .info-large-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 40px 20px;
      background: var(--bg-selected);
      border-radius: 24px;
      border: 1px solid var(--border-color);
      margin-bottom: 32px;
      text-align: center;
    }
    .avatar-large {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent-secondary, var(--accent)));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .info-email {
      font-size: 20px;
      font-weight: 800;
      margin: 0 0 8px 0;
      color: var(--text-primary);
    }
    .info-status {
      font-size: 13px;
      font-weight: 600;
      color: #22c55e;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }
    .wa-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      color: var(--text-secondary);
      margin-top: 40px;
      text-align: center;
      opacity: 0.6;
    }

    /* Security View elements */
    .security-container {
      background: transparent;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 24px;
    }

    /* Mobile Header & Divider */
    .mobile-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--border-color);
    }
    .mobile-divider {
      height: 1px;
      background: var(--border-color);
      margin: 32px 0;
      width: 100%;
    }

    /* Alerts */
    .alert { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
    .alert-success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; }
    .alert-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }

    /* Form */
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.3px; }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-field { width: 100%; padding: 12px 44px 12px 14px; border-radius: 14px; font-size: 14px; }
    .eye-btn { position: absolute; right: 12px; background: transparent; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px; display: flex; align-items: center; border-radius: 6px; transition: color 0.2s; }
    .eye-btn:hover { color: var(--accent); }

    .submit-btn { width: 100%; margin-top: 16px; padding: 14px; border-radius: 14px; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Spinner */
    .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* RESPONSIVE TOGGLES */
    @media (min-width: 901px) {
      .hide-on-desktop { display: none !important; }
    }

    @media (max-width: 900px) {
      .hide-on-mobile { display: none !important; }
      
      .profile-container { padding: 0; align-items: flex-start; }
      .wa-layout { 
        height: auto; 
        max-height: none; 
        min-height: 100vh;
        border-radius: 0; 
        flex-direction: column; 
      }
      .wa-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--border-color); }
      .main-content-scroll { padding: 24px 20px; flex-direction: column; align-items: center; overflow: visible; }
      .content-section { max-width: 100%; }
      .info-large-card { padding: 24px 16px; margin-bottom: 0; }
    }
  `]
})
export class ProfileComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  activeTab = signal<'info' | 'security'>('security');

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

