import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_CATEGORIES, MockCategory, MockNote } from '../../core/data/mock-data';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <!-- Crystal Decorations -->
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -3s;"></div>

      <!-- Layout -->
      <div class="layout">
        
        <!-- Sidebar (Visible on Desktop, Drawer on Mobile) -->
        <aside class="sidebar glass" [class.mobile-open]="sidebarOpen()">
          <div class="sidebar-header">
            <div class="search-wrapper">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16" y2="16"></line>
                </svg>
              </span>
              <input type="text" placeholder="Buscar una nota o iniciar una nueva." class="search-input input-field">
            </div>
          </div>

          <div class="category-list">
            @for (cat of categories; track cat.id) {
              <div 
                class="category-item" 
                [class.active]="selectedCategory()?.id === cat.id"
                (click)="selectCategory(cat)"
              >
                <div class="category-icon-circle" [style.background-color]="cat.color + '20'">
                  <span class="cat-icon">{{ cat.icon }}</span>
                </div>
                <div class="category-info">
                  <div class="cat-top">
                    <span class="cat-name">{{ cat.name }}</span>
                    <span class="cat-date">{{ cat.lastDate }}</span>
                  </div>
                  <p class="cat-snippet">{{ cat.lastMessage }}</p>
                </div>
              </div>
            }
          </div>

          <!-- Mobile Bottom Nav -->
          <div class="mobile-nav">
             <div class="nav-item active">
               <span class="nav-icon">💬</span>
               <span class="nav-label">Chats</span>
             </div>
             <div class="nav-item">
               <span class="nav-icon">⭕</span>
               <span class="nav-label">Novedades</span>
             </div>
             <div class="nav-item">
               <span class="nav-icon">📞</span>
               <span class="nav-label">Llamadas</span>
             </div>
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="main-content">
          <!-- Chat Header -->
          <header class="chat-header">
            <button class="mobile-back" (click)="toggleSidebar()">☰</button>
            @if (selectedCategory(); as cat) {
              <div class="header-info">
                <div class="header-text">
                  <h2 class="header-title">{{ cat.name }}</h2>
                </div>
              </div>
            }
            <div class="header-actions">
              <button class="action-btn" (click)="toggleMenu()">⋮</button>
              
              @if (menuOpen()) {
                <div class="dropdown-menu glass animate-fade-in-up">
                  <button class="menu-item danger" (click)="logout()">
                    <span class="menu-icon">🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              }
            </div>
          </header>

          <!-- Chat History -->
          <div class="chat-history">
            <div class="date-divider"><span>Hoy</span></div>

            @if (selectedCategory(); as cat) {
              @for (note of cat.notes; track note.id) {
                <div class="message-row" [class.sent]="true">
                  <div class="message-bubble glass">
                    
                    <!-- Attachment Mockup -->
                    @if (note.hasAttachment) {
                      <div class="attachment-box glass">
                        <div class="file-icon">📄</div>
                        <div class="file-info">
                          <span class="file-name">{{ note.attachmentName }}</span>
                          <span class="file-meta">{{ note.attachmentType }} - {{ note.attachmentSize }}</span>
                        </div>
                      </div>
                    }

                    <p class="message-text">{{ note.content }}</p>
                    <div class="message-footer">
                      <span class="message-time">{{ note.timestamp }}</span>
                      <span class="message-status">✓✓</span>
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <!-- Bottom Input Bar -->
          <footer class="chat-input-bar">
            <div class="input-container glass">
              <input type="text" placeholder="Escribe una nota" class="chat-input">
            </div>
            <button class="send-btn btn-primary animate-float">
              ➤
            </button>
          </footer>

          <!-- FAB for folders (Mobile only style) -->
          <button class="fab-btn glass">📁+</button>
        </main>

      </div>
    </div>
  `,
  styles: [`
    .home-container {
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    .layout {
      width: 100%;
      max-width: 1200px;
      height: 100%;
      max-height: 850px;
      display: flex;
      border-radius: 32px;
      overflow: hidden;
      z-index: 10;
      border: 1px solid var(--border-card);
      box-shadow: var(--shadow-card);
    }

    /* Sidebar */
    .sidebar {
      width: 350px;
      background: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .sidebar-header {
      padding: 20px 12px 12px 12px;
    }

    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      opacity: 0.8;
    }

    .search-input {
      width: 100%;
      padding: 10px 10px 10px 35px;
      border-radius: 20px;
      font-size: 13px;
    }

    .category-list {
      flex: 1;
      overflow-y: auto;
      background: transparent;
      margin: 0 4px 20px 12px;
      padding: 0 8px 0 0;
      overflow-x: hidden;
    }

    /* Thin scrollbar for categories */
    .category-list::-webkit-scrollbar {
      width: 4px;
    }
    .category-list::-webkit-scrollbar-track {
      background: transparent;
    }
    .category-list::-webkit-scrollbar-thumb {
      background: rgba(139, 92, 246, 0.2);
      border-radius: 10px;
    }
    .category-list::-webkit-scrollbar-thumb:hover {
      background: rgba(139, 92, 246, 0.4);
    }

    .category-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 4px;
    }

    .category-item:hover {
      background: var(--bg-card-hover);
    }

    .category-item.active {
      background: var(--bg-selected);
    }

    .category-icon-circle {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .category-info {
      flex: 1;
      min-width: 0;
    }

    .cat-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .cat-name {
      font-weight: 700;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cat-date {
      font-size: 11px;
      color: var(--text-muted);
    }

    .cat-snippet {
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: transparent;
      position: relative;
    }

    .chat-header {
      padding: 15px 25px;
      background: transparent;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .header-icon {
      font-size: 24px;
    }

    .header-title {
      font-size: 16px;
      font-weight: 800;
    }

    .header-status {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .header-actions {
      position: relative;
    }
    
    .action-btn {
      background: transparent;
      border: none;
      font-size: 20px;
      color: var(--text-primary);
      cursor: pointer;
      padding: 4px 12px;
      border-radius: 8px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .action-btn:hover {
      background: var(--bg-card-hover);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      min-width: 200px;
      border-radius: 16px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 100;
      transform-origin: top right;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-card);
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: transparent;
      border: none;
      border-radius: 12px;
      color: var(--text-primary);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
      width: 100%;
    }

    .menu-icon {
      font-size: 16px;
    }

    .menu-item:hover {
      background: var(--bg-selected);
      color: var(--text-accent);
    }

    .menu-item.danger:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .menu-divider {
      height: 1px;
      background: var(--border-color);
      margin: 4px 0;
    }

    .chat-history {
      flex: 1;
      overflow-y: auto;
      padding: 25px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .date-divider {
      text-align: center;
      margin: 10px 0;
      position: relative;
    }

    .date-divider span {
      background: var(--bg-selected);
      padding: 4px 16px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      color: var(--text-accent);
    }

    .message-row {
      display: flex;
      width: 100%;
    }

    .message-row.sent {
      justify-content: flex-end;
    }

    .message-bubble {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 20px;
      position: relative;
    }

    .sent .message-bubble {
      background: var(--bg-bubble-sent);
      border-bottom-right-radius: 4px;
    }

    .attachment-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      border-radius: 12px;
      margin-bottom: 8px;
    }

    .file-icon {
      font-size: 24px;
    }

    .file-info {
      display: flex;
      flex-direction: column;
    }

    .file-name {
      font-size: 13px;
      font-weight: 600;
    }

    .file-meta {
      font-size: 10px;
      opacity: 0.7;
    }

    .message-text {
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
    }

    .message-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .message-time {
      font-size: 10px;
      opacity: 0.6;
    }

    .message-status {
      font-size: 10px;
      color: var(--text-accent);
    }

    /* Input Bar */
    .chat-input-bar {
      padding: 20px 25px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .input-container {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      border-radius: 25px;
    }

    .chat-input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 10px;
      font-size: 14px;
      color: var(--text-primary);
    }

    .chat-input:focus {
      outline: none;
    }

    .input-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .input-btn:hover {
      opacity: 1;
    }

    .send-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    /* FAB */
    .fab-btn {
      position: absolute;
      bottom: 100px;
      right: 30px;
      width: 56px;
      height: 56px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: var(--shadow-card);
      border: 1px solid var(--border-color);
      display: none; /* Desktop hidden */
    }

    /* Crystal Decos */
    .crystal {
      position: absolute;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
      opacity: 0.15;
      filter: blur(60px);
      pointer-events: none;
    }

    .crystal-top-right { top: -300px; right: -300px; }
    .crystal-bottom-left { bottom: -300px; left: -300px; }

    /* Mobile Navigation */
    .mobile-nav {
      display: none;
      background: var(--bg-nav);
      backdrop-filter: blur(10px);
      padding: 10px 0;
      border-top: 1px solid var(--border-color);
    }

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }

    .nav-icon { font-size: 20px; }
    .nav-label { font-size: 10px; font-weight: 600; }
    .nav-item.active .nav-icon {
      background: var(--bg-selected);
      padding: 4px 16px;
      border-radius: 12px;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .home-container { padding: 0; }
      .layout { border-radius: 0; max-height: none; }
      .sidebar { width: 100%; position: absolute; height: 100%; z-index: 20; transform: translateX(-100%); }
      .sidebar.mobile-open { transform: translateX(0); }
      .sidebar-header { padding-top: 50px; }
      .mobile-nav { display: flex; }
      .chat-header { padding-top: 40px; }
      .mobile-back { display: block; background: transparent; border: none; font-size: 24px; }
      .fab-btn { display: flex; }
    }

    .mobile-back { display: none; }
  `],
})
export class HomeComponent {
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly categories = MOCK_CATEGORIES;
  readonly selectedCategory = signal<MockCategory | null>(MOCK_CATEGORIES[0]);
  readonly sidebarOpen = signal(false);
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  changeTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  selectCategory(cat: MockCategory): void {
    this.selectedCategory.set(cat);
    if (window.innerWidth <= 900) {
      this.sidebarOpen.set(false);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }
}
