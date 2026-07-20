import { Component, inject, signal, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent, FormsModule],
  template: `
    <app-theme-toggle />
    <div class="verify-container">
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -2s;"></div>

      <div class="verify-content animate-fade-in-up">
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
          <div class="otp-icon">📧</div>
          <h2 class="form-title">Verifica tu correo</h2>
          <p class="form-subtitle">
            Ingresa el código de 6 dígitos enviado a<br>
            <strong>{{ email }}</strong>
          </p>

          @if (errorMessage()) {
            <div class="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {{ errorMessage() }}
            </div>
          }

          @if (successMessage()) {
            <div class="success-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/></svg>
              {{ successMessage() }}
            </div>
          }

          <!-- OTP Digits -->
          <div class="otp-inputs">
            @for (digit of otpDigits; track $index) {
              <input
                #digitInput
                type="text"
                maxlength="1"
                inputmode="numeric"
                class="otp-digit"
                [value]="digit"
                [disabled]="loading()"
                (input)="onDigitInput($event, $index)"
                (keydown)="onKeyDown($event, $index)"
                (paste)="onPaste($event)"
              />
            }
          </div>

          <button id="verify-btn" class="btn-primary verify-btn" (click)="doVerify()" [disabled]="loading() || getOtp().length < 6">
            @if (loading()) {
              <span class="spinner"></span> Verificando...
            } @else {
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Verificar código
            }
          </button>

          <p class="resend-text">
            ¿No recibiste el código?
            <button class="resend-link" (click)="resendOtp()" [disabled]="resendCooldown > 0">
              @if (resendCooldown > 0) { Reenviar en {{ resendCooldown }}s } @else { Reenviar }
            </button>
          </p>

          <p class="back-text">
            <a routerLink="/login" class="back-link">← Volver al login</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .verify-container { min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 24px; position: relative; overflow: hidden; }
    .crystal { position: absolute; background: radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%); opacity: 0.2; pointer-events: none; filter: blur(50px); }
    .crystal-top-right { width: 800px; height: 800px; top: -200px; right: -200px; }
    .crystal-bottom-left { width: 1000px; height: 1000px; bottom: -300px; left: -300px; }
    .verify-content { width: 100%; max-width: 500px; z-index: 1; }
    .logo-section { text-align: center; margin-bottom: 16px; }
    .logo-icon { display: inline-flex; justify-content: center; align-items: center; margin-bottom: 6px; filter: drop-shadow(0 6px 18px rgba(0,0,0,0.1)); }
    .app-name { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 0; letter-spacing: -0.5px; }
    .form-card { position: relative; padding: 40px 48px; border-radius: 16px; background: var(--bg-form-card); border: var(--border-form-card); box-shadow: var(--glow-form-card); text-align: center; }
    .otp-icon { font-size: 48px; margin-bottom: 8px; }
    .form-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
    .form-subtitle { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6; }
    .form-subtitle strong { color: var(--accent); }
    .error-banner { display: flex; align-items: center; gap: 8px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 500; margin-bottom: 16px; text-align: left; }
    .success-banner { display: flex; align-items: center; gap: 8px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 500; margin-bottom: 16px; text-align: left; }
    .otp-inputs { display: flex; gap: 12px; justify-content: center; margin-bottom: 24px; }
    .otp-digit { width: 52px; height: 60px; border-radius: 12px; border: 2px solid var(--border-input); background: var(--bg-form-input); font-size: 24px; font-weight: 700; text-align: center; color: var(--text-primary); font-family: 'Inter', monospace; transition: all 0.2s ease; caret-color: var(--accent); }
    .otp-digit:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--bg-selected); transform: scale(1.05); }
    .otp-digit:disabled { opacity: 0.6; }
    .verify-btn { width: 100%; padding: 13px; border-radius: 10px; font-size: 16px; font-weight: 600; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .verify-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .resend-text { margin-top: 16px; font-size: 13px; color: var(--text-secondary); }
    .resend-link { background: none; border: none; color: var(--accent); font-weight: 600; cursor: pointer; font-size: 13px; font-family: 'Inter', sans-serif; padding: 0; margin-left: 4px; }
    .resend-link:disabled { opacity: 0.5; cursor: not-allowed; }
    .back-text { margin-top: 12px; font-size: 13px; }
    .back-link { color: var(--text-secondary); text-decoration: none; }
    .back-link:hover { color: var(--accent); }
    @media (max-width: 480px) {
      .verify-container { padding: 16px; align-items: flex-start; padding-top: 40px; }
      .form-card { padding: 24px 20px; }
      .otp-digit { width: 42px; height: 52px; font-size: 20px; }
      .otp-inputs { gap: 8px; }
    }
  `],
})
export class VerifyOtpComponent implements OnInit {
  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef>;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  email = '';
  mode = 'registration'; // 'registration' | 'reset'
  otpDigits = ['', '', '', '', '', ''];
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  resendCooldown = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) this.email = params['email'];
      if (params['mode']) this.mode = params['mode'];
    });
  }

  getOtp(): string {
    return this.otpDigits.join('');
  }

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.otpDigits[index] = value ? value[value.length - 1] : '';
    input.value = this.otpDigits[index];
    if (this.otpDigits[index] && index < 5) {
      const inputs = this.digitInputs.toArray();
      inputs[index + 1]?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const inputs = this.digitInputs.toArray();
      this.otpDigits[index - 1] = '';
      inputs[index - 1]?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '') ?? '';
    pasted.split('').slice(0, 6).forEach((char, i) => {
      this.otpDigits[i] = char;
    });
    const inputs = this.digitInputs.toArray();
    const nextEmpty = Math.min(pasted.length, 5);
    inputs[nextEmpty]?.nativeElement.focus();
  }

  doVerify(): void {
    const otp = this.getOtp();
    if (otp.length < 6) {
      this.errorMessage.set('Por favor ingresa los 6 dígitos del código.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    if (this.mode === 'reset') {
      this.router.navigate(['/reset-password'], { queryParams: { email: this.email, otp } });
      this.loading.set(false);
      return;
    }

    this.authService.verifyRegistrationOtp(this.email, otp).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message || 'Código inválido o expirado.';
        this.errorMessage.set(msg);
      }
    });
  }

  resendOtp(): void {
    if (this.mode === 'reset') {
      this.authService.forgotPassword(this.email).subscribe({
        next: () => this.startResendCooldown(),
        error: () => this.startResendCooldown()
      });
    } else {
      this.authService.register(this.email, '').subscribe({
        next: () => this.startResendCooldown(),
        error: () => this.startResendCooldown()
      });
    }
  }

  private startResendCooldown(): void {
    this.successMessage.set('Código reenviado. Revisa tu correo.');
    this.resendCooldown = 60;
    const interval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(interval);
        this.successMessage.set('');
      }
    }, 1000);
  }
}
