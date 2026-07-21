import { Component, inject, OnInit, signal, effect, ElementRef, ViewChild, AfterViewChecked, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService, THEME_OPTIONS, ThemeOption } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { CategoryService, Category } from '../../core/services/category.service';
import { NoteService, Note } from '../../core/services/note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="home-container">
      <div class="crystal crystal-top-right animate-float"></div>
      <div class="crystal crystal-bottom-left animate-float" style="animation-delay: -3s;"></div>

      <div class="layout">
        
        <!-- Sidebar -->
        <aside class="sidebar glass" [class.mobile-open]="sidebarOpen()">
          <div class="sidebar-header">
            <div class="search-wrapper">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16" y2="16"></line></svg>
              </span>
              <input type="text" placeholder="Buscar categoría..." class="search-input input-field">
            </div>

            <!-- Config Button (gear only) -->
            <div class="config-wrapper" [class.open]="configOpen()">
              <button class="config-btn-icon" (click)="toggleConfig()" [class.active]="configOpen()" title="Configuración">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </button>
              
              @if (configOpen()) {
                <div class="config-panel glass animate-fade-in-up">
                  <!-- Personalización -->
                  <div class="config-section">
                    <div class="config-section-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                      Personalización
                    </div>
                    <div class="theme-grid">
                      @for (theme of themeOptions; track theme.name) {
                        <button 
                          class="theme-option"
                          [class.active]="themeService.currentTheme() === theme.name"
                          (click)="selectTheme(theme.name)"
                          [title]="theme.description"
                        >
                          <span class="theme-emoji">{{ theme.emoji }}</span>
                          <span class="theme-label">{{ theme.label }}</span>
                        </button>
                      }
                    </div>
                  </div>
  
                  <div class="config-divider"></div>
  
                  <!-- Mi Cuenta -->
                  <button class="config-profile" (click)="goToProfile()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Mi Cuenta
                  </button>
  
                  <div class="config-divider"></div>
  
                  <!-- Cerrar Sesión -->
                  <button class="config-logout" (click)="logout()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Cerrar Sesión
                  </button>
                </div>
              }
            </div>
          </div>

          <div class="category-list">
            <!-- General Category -->
            <div 
              class="category-item" 
              [class.active]="noteService.activeCategoryId() === null"
              (click)="selectCategory(null)"
            >
              <div class="category-icon-circle" style="background-color: rgba(139, 92, 246, 0.2)">
                <span class="cat-icon">📂</span>
              </div>
              <div class="category-info">
                <div class="cat-top">
                  <span class="cat-name">General / Sin clasificar</span>
                </div>
              </div>
            </div>

            <!-- Dynamic Categories -->
            @for (cat of categoryService.categories(); track cat.id) {
              <div 
                class="category-item" 
                [class.active]="noteService.activeCategoryId() === cat.id"
                (click)="selectCategory(cat)"
                (contextmenu)="onCategoryContextMenu($event, cat)"
              >
                <div class="category-icon-circle" [style.background-color]="cat.color + '20'">
                  <span class="cat-icon" [style.color]="cat.color">📁</span>
                </div>
                <div class="category-info">
                  <div class="cat-top">
                    <span class="cat-name">{{ cat.name }}</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Add Category Button (Floating) -->
          <div class="add-cat-wrapper">
             @if (isCreatingCategory()) {
               <div style="display: flex; gap: 4px; background: var(--bg-card); padding: 8px; border-radius: 12px; box-shadow: var(--shadow-card);">
                 <input type="text" [(ngModel)]="newCategoryName" placeholder="Nombre" class="input-field" style="flex:1; padding: 6px 10px;" (keyup.enter)="createCategory()">
                 <button (click)="createCategory()" class="btn-primary" style="padding: 6px 12px; border-radius: 8px;">✓</button>
                 <button (click)="isCreatingCategory.set(false)" style="background:transparent; border:none; color:var(--text-secondary); cursor: pointer;">✕</button>
               </div>
             } @else {
               <button class="add-cat-btn-floating glass" (click)="isCreatingCategory.set(true)" title="Nueva Categoría">
                 +
               </button>
             }
          </div>
        </aside>

        <!-- Main Chat Area -->
        <main class="main-content">
          <header class="chat-header">
            <button class="mobile-back" (click)="toggleSidebar()">☰</button>
            <div class="header-info">
              <div class="header-text">
                <h2 class="header-title">{{ getActiveCategoryName() }}</h2>
              </div>
            </div>
            
            <!-- User Menu -->
            <div class="header-actions">
              <span class="user-email" style="margin-right: 12px; font-size: 13px; opacity:0.8;">{{ authService.getEmail() }}</span>
              @if (noteService.activeCategoryId() !== null) {
                <button class="action-btn" (click)="toggleMenu()">⋮</button>
                
                @if (menuOpen()) {
                  <div class="dropdown-menu glass animate-fade-in-up">
                    <button class="menu-item danger" (click)="confirmDeleteCategory(noteService.activeCategoryId())">
                      <span class="menu-icon">🗑️</span>
                      <span>Eliminar Categoría</span>
                    </button>
                  </div>
                }
              }
            </div>
          </header>

          <!-- Chat/Notes History -->
          <div class="chat-history" #scrollContainer>
            
            @if (noteService.loading()) {
              <div style="text-align: center; opacity: 0.5; padding: 20px;">Cargando notas...</div>
            } @else if (noteService.notes().length === 0) {
              <div style="text-align: center; opacity: 0.5; padding: 20px;">No hay notas aquí. ¡Escribe la primera abajo!</div>
            }

            @for (note of reversedNotes(); track note.id) {
              <div class="message-row sent">
                <div class="message-bubble glass" (contextmenu)="onNoteContextMenu($event, note)">
                  <p class="message-text">{{ note.body }}</p>
                  <div class="message-footer">
                    <span class="message-time">{{ note.createdAt | date:'short' }}</span>
                    <button class="note-options-btn" (click)="onNoteOptionsClick($event, note)">⋮</button>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Bottom Input Bar -->
          <footer class="chat-input-bar">
            <div class="input-container glass">
              <input 
                type="text" 
                placeholder="Escribe una nota rápida..." 
                class="chat-input"
                [(ngModel)]="newNoteBody"
                (keyup.enter)="createNote()"
                [disabled]="isSending()"
              >
            </div>
            <button class="send-btn btn-primary animate-float" (click)="createNote()" [disabled]="!newNoteBody.trim() || isSending()">
              @if (isSending()) { <span class="spinner" style="width:14px;height:14px;"></span> } @else { ➤ }
            </button>
          </footer>

        </main>
      </div>

      <!-- Context Menu for Category -->
      @if (contextMenuOpen() && categoryToEdit) {
        <div 
          class="dropdown-menu glass animate-fade-in-up" 
          [style.position]="'fixed'"
          [style.left.px]="contextMenuPosition.x"
          [style.top.px]="contextMenuPosition.y"
          style="z-index: 1000;"
        >
          <button class="menu-item danger" (click)="confirmDeleteCategory(categoryToEdit.id)">
            <span class="menu-icon">🗑️</span>
            <span>Eliminar Categoría</span>
          </button>
        </div>
      }

      <!-- Delete Category Modal -->
      @if (showDeleteModal()) {
        <div class="modal-overlay animate-fade-in">
          <div class="modal-content glass animate-fade-in-up">
            <h3 class="modal-title">¿Eliminar categoría?</h3>
            <p class="modal-text">Estás a punto de eliminar la categoría y <strong>todas sus notas asociadas</strong>. Esta acción no se puede deshacer.</p>
            <div class="modal-actions">
              <button class="btn-secondary" (click)="showDeleteModal.set(false)">Cancelar</button>
              <button class="btn-danger" (click)="executeDeleteCategory()">Eliminar</button>
            </div>
          </div>
        </div>
      }

      <!-- Context Menu for Note -->
      @if (noteContextMenuOpen() && noteToEdit) {
        <div 
          class="dropdown-menu glass animate-fade-in-up" 
          [style.position]="'fixed'"
          [style.left.px]="noteContextMenuPosition.x"
          [style.top.px]="noteContextMenuPosition.y"
          style="z-index: 1000; width: 170px; min-width: 170px;"
        >
          <button class="menu-item" (click)="openEditNoteModal()">
            <span class="menu-icon">✏️</span>
            <span>Editar</span>
          </button>
          <button class="menu-item" (click)="openMultiSelectModal('copy')">
            <span class="menu-icon">📄</span>
            <span>Copiar a...</span>
          </button>
          <button class="menu-item" (click)="openMultiSelectModal('move')">
            <span class="menu-icon">➡️</span>
            <span>Mover a...</span>
          </button>
          <button class="menu-item danger" (click)="deleteNote(noteToEdit.id)">
            <span class="menu-icon">🗑️</span>
            <span>Eliminar</span>
          </button>
        </div>
      }

      <!-- Edit Note Modal -->
      @if (showEditNoteModal()) {
        <div class="modal-overlay animate-fade-in">
          <div class="modal-content glass animate-fade-in-up">
            <h3 class="modal-title">Editar Nota</h3>
            <textarea class="input-field" [(ngModel)]="editNoteBody" rows="4" style="width: 100%; margin-bottom: 16px; padding: 12px; resize: none;"></textarea>
            <div class="modal-actions">
              <button class="btn-secondary" (click)="showEditNoteModal.set(false)">Cancelar</button>
              <button class="btn-primary" (click)="executeEditNote()">Guardar</button>
            </div>
          </div>
        </div>
      }

      <!-- Copy/Move Note Modal -->
      @if (showMultiSelectModal()) {
        <div class="modal-overlay animate-fade-in">
          <div class="modal-content glass animate-fade-in-up">
            <h3 class="modal-title">{{ multiSelectAction() === 'copy' ? 'Copiar a...' : 'Mover a...' }}</h3>
            <div class="category-selection-list" style="max-height: 300px; overflow-y: auto; margin-bottom: 16px;">
              <!-- General Option -->
              <label class="category-checkbox-item">
                <input type="checkbox" [checked]="selectedCategories.has(null)" (change)="toggleCategorySelection(null)">
                <span class="cat-icon">📂</span>
                <span>General / Sin clasificar</span>
              </label>
              
              <!-- Dynamic Categories -->
              @for (cat of categoryService.categories(); track cat.id) {
                <label class="category-checkbox-item">
                  <input type="checkbox" [checked]="selectedCategories.has(cat.id)" (change)="toggleCategorySelection(cat.id)">
                  <span class="cat-icon" [style.color]="cat.color">📁</span>
                  <span>{{ cat.name }}</span>
                </label>
              }
            </div>
            <div class="modal-actions">
              <button class="btn-secondary" (click)="showMultiSelectModal.set(false)">Cancelar</button>
              <button class="btn-primary" (click)="executeMultiSelectAction()">
                {{ multiSelectAction() === 'copy' ? 'Copiar' : 'Mover' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .home-container { height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; padding: 20px; position: relative; overflow: hidden; }
    .layout { width: 100%; max-width: 1200px; height: 100%; max-height: 850px; display: flex; border-radius: 32px; overflow: hidden; z-index: 10; border: 1px solid var(--border-card); box-shadow: var(--shadow-card); }
    .sidebar { width: 350px; background: var(--bg-sidebar); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; transition: all 0.3s ease; position: relative; }
    .sidebar-header { padding: 12px; display: flex; align-items: center; gap: 10px; }
    .search-wrapper { position: relative; display: flex; align-items: center; flex: 1; }
    .search-icon { position: absolute; left: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); opacity: 0.8; }
    .search-input { width: 100%; padding: 10px 10px 10px 35px; border-radius: 20px; font-size: 13px; }
    .category-list { flex: 1; overflow-y: auto; background: transparent; margin: 0 4px 0 12px; padding: 0 8px 0 0; }
    .category-list::-webkit-scrollbar { width: 4px; }
    .category-list::-webkit-scrollbar-track { background: transparent; }
    .category-list::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.2); border-radius: 10px; }
    .category-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 18px; cursor: pointer; transition: all 0.2s ease; margin-bottom: 4px; }
    .category-item:hover { background: var(--bg-card-hover); }
    .category-item.active { background: var(--bg-selected); }
    .category-icon-circle { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .category-info { flex: 1; min-width: 0; }
    .cat-top { display: flex; justify-content: space-between; align-items: center; }
    .cat-name { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    
    .add-cat-wrapper { position: absolute; bottom: 20px; right: 20px; z-index: 50; }
    .add-cat-btn-floating { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; background: var(--accent); color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.2s; }
    .add-cat-btn-floating:hover { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }

    /* Config / Settings panel */
    .config-wrapper { position: relative; padding: 0; border: none; }
    .config-btn-icon { display: flex; align-items: center; justify-content: center; padding: 8px; border-radius: 50%; background: transparent; border: none; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
    .config-btn-icon:hover, .config-btn-icon.active { background: var(--bg-selected); color: var(--accent); }
    .config-btn-icon svg { transition: transform 0.3s; }
    .config-btn-icon.active svg { transform: rotate(45deg); }
    .config-panel { position: absolute; top: calc(100% + 10px); right: 0; width: 240px; border-radius: 18px; padding: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-card); display: flex; flex-direction: column; gap: 12px; z-index: 50; }
    .config-section-title { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    .theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .theme-option { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 8px; border-radius: 12px; border: 1.5px solid var(--border-color); background: transparent; cursor: pointer; transition: all 0.2s; color: var(--text-primary); font-family: 'Inter', sans-serif; }
    .theme-option:hover { background: var(--bg-card-hover); border-color: var(--accent); }
    .theme-option.active { background: var(--bg-selected); border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
    .theme-emoji { font-size: 20px; }
    .theme-label { font-size: 11px; font-weight: 700; }
    .config-divider { height: 1px; background: var(--border-color); }
    .config-logout { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 16px; border-radius: 12px; background: transparent; border: none; color: #ef4444; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.2s; }
    .config-logout:hover { background: rgba(239, 68, 68, 0.1); }
    .config-profile { display: flex; align-items: center; gap: 10px; width: 100%; padding: 11px 16px; border-radius: 12px; background: transparent; border: none; color: var(--text-secondary); font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.2s; }
    .config-profile:hover { background: var(--bg-selected); color: var(--accent); }

    .main-content { flex: 1; display: flex; flex-direction: column; background: transparent; position: relative; }
    .chat-header { padding: 15px 25px; background: transparent; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 15px; }
    .header-info { display: flex; align-items: center; gap: 12px; flex: 1; }
    .header-title { font-size: 16px; font-weight: 800; }
    .header-actions { position: relative; display: flex; align-items: center; }
    .action-btn { background: transparent; border: none; font-size: 20px; color: var(--text-primary); cursor: pointer; padding: 4px 12px; border-radius: 8px; transition: background 0.2s; }
    .action-btn:hover { background: var(--bg-card-hover); }
    
    .dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 8px; min-width: 130px; border-radius: 16px; padding: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 100; border: 1px solid var(--border-color); box-shadow: var(--shadow-card); }
    .menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: transparent; border: none; border-radius: 12px; color: var(--text-primary); font-size: 14px; font-weight: 500; cursor: pointer; text-align: left; transition: all 0.2s; width: 100%; }
    .menu-item:hover { background: var(--bg-selected); color: var(--text-accent); }
    .menu-item.danger:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

    .chat-history { flex: 1; overflow-y: auto; padding: 25px; display: flex; flex-direction: column; gap: 15px; }
    .message-row { display: flex; width: 100%; justify-content: flex-end; }
    .message-bubble { max-width: 75%; padding: 12px 16px; border-radius: 20px; position: relative; background: var(--bg-bubble-sent); border-bottom-right-radius: 4px; }
    .message-text { font-size: 14px; line-height: 1.5; white-space: pre-wrap; margin:0;}
    .message-footer { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-top: 6px; }
    .message-time { font-size: 10px; opacity: 0.6; }
    .note-options-btn { background: none; border: none; color: var(--text-primary); opacity: 0.6; cursor: pointer; font-size: 14px; padding: 0 4px; border-radius: 4px; }
    .note-options-btn:hover { opacity: 1; background: rgba(255,255,255,0.1); }
    .category-checkbox-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 12px; cursor: pointer; transition: background 0.2s; }
    .category-checkbox-item:hover { background: var(--bg-card-hover); }
    .category-checkbox-item input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--accent); }

    .chat-input-bar { padding: 20px 25px; display: flex; align-items: center; gap: 15px; }
    .input-container { flex: 1; display: flex; align-items: center; padding: 5px 15px; border-radius: 25px; }
    .chat-input { flex: 1; background: transparent; border: none; padding: 10px; font-size: 14px; color: var(--text-primary); }
    .chat-input:focus { outline: none; }
    .send-btn { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .crystal { position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, var(--accent) 0%, transparent 70%); opacity: 0.15; filter: blur(60px); pointer-events: none; }
    .crystal-top-right { top: -300px; right: -300px; }
    .crystal-bottom-left { bottom: -300px; left: -300px; }

    .mobile-back { display: none; }

    @media (max-width: 900px) {
      .home-container { padding: 0; }
      .layout { border-radius: 0; max-height: none; }
      .sidebar { width: 100%; position: absolute; height: 100%; z-index: 20; transform: translateX(-100%); }
      .sidebar.mobile-open { transform: translateX(0); }
      .sidebar-header { padding-top: 50px; }
      .chat-header { padding-top: 40px; }
      .mobile-back { display: block; background: transparent; border: none; font-size: 24px; cursor: pointer;}
    }

    /* Modal Styles */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(4px); }
    .modal-content { background: var(--bg-form-card); border: 1px solid var(--border-color); box-shadow: var(--shadow-card); padding: 24px; border-radius: 20px; max-width: 400px; width: 90%; }
    .modal-title { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }
    .modal-text { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.5; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
    .btn-secondary { padding: 10px 16px; border-radius: 12px; border: 1px solid var(--border-color); background: transparent; color: var(--text-primary); font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;}
    .btn-secondary:hover { background: var(--bg-card-hover); }
    .btn-danger { padding: 10px 16px; border-radius: 12px; border: none; background: #ef4444; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;}
    .btn-danger:hover { background: #dc2626; }
  `],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  readonly authService = inject(AuthService);
  readonly categoryService = inject(CategoryService);
  readonly noteService = inject(NoteService);
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  readonly themeOptions: ThemeOption[] = THEME_OPTIONS;

  sidebarOpen = signal(false);
  menuOpen = signal(false);
  configOpen = signal(false);
  
  isCreatingCategory = signal(false);
  newCategoryName = '';

  newNoteBody = '';
  isSending = signal(false);

  contextMenuOpen = signal(false);
  contextMenuPosition = { x: 0, y: 0 };
  categoryToEdit: Category | null = null;

  showDeleteModal = signal(false);
  categoryToDeleteId: number | null = null;

  noteContextMenuOpen = signal(false);
  noteContextMenuPosition = { x: 0, y: 0 };
  noteToEdit: Note | null = null;

  showEditNoteModal = signal(false);
  editNoteBody = '';

  showMultiSelectModal = signal(false);
  multiSelectAction = signal<'copy' | 'move'>('copy');
  selectedCategories = new Set<number | null>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.configOpen() && !target.closest('.config-wrapper')) {
      this.configOpen.set(false);
    }
    if (this.menuOpen() && !target.closest('.header-actions')) {
      this.menuOpen.set(false);
    }
    if (this.contextMenuOpen()) {
      this.contextMenuOpen.set(false);
    }
    if (this.noteContextMenuOpen()) {
      this.noteContextMenuOpen.set(false);
    }
  }

  ngOnInit() {
    this.categoryService.loadCategories();
    this.noteService.loadNotes(null); // Load General notes by default
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // Reverse notes so newest is at bottom (chat style)
  reversedNotes() {
    return [...this.noteService.notes()].reverse();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  onCategoryContextMenu(event: MouseEvent, cat: Category): void {
    event.preventDefault();
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.categoryToEdit = cat;
    this.contextMenuOpen.set(true);
  }

  confirmDeleteCategory(id: number | null): void {
    if (id === null) return;
    this.categoryToDeleteId = id;
    this.menuOpen.set(false);
    this.contextMenuOpen.set(false);
    this.showDeleteModal.set(true);
  }

  executeDeleteCategory(): void {
    if (this.categoryToDeleteId === null) return;
    
    // moveNotes = false to delete the category and its notes
    this.categoryService.deleteCategory(this.categoryToDeleteId, false).subscribe({
      next: () => {
        this.showDeleteModal.set(false);
        this.categoryToDeleteId = null;
        this.selectCategory(null); // Go back to general
      },
      error: () => {
        this.showDeleteModal.set(false);
      }
    });
  }

  toggleConfig(): void {
    this.configOpen.update(v => !v);
  }

  selectTheme(name: any): void {
    this.themeService.setTheme(name);
  }

  goToProfile(): void {
    this.configOpen.set(false);
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.configOpen.set(false);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  selectCategory(cat: Category | null): void {
    this.noteService.loadNotes(cat ? cat.id : null);
    if (window.innerWidth <= 900) {
      this.sidebarOpen.set(false);
    }
  }

  getActiveCategoryName(): string {
    const activeId = this.noteService.activeCategoryId();
    if (activeId === null) return 'General / Sin clasificar';
    const cat = this.categoryService.categories().find(c => c.id === activeId);
    return cat ? cat.name : '';
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  createCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.createCategory(this.newCategoryName, '#8B5CF6').subscribe(() => {
      this.newCategoryName = '';
      this.isCreatingCategory.set(false);
    });
  }

  createNote(): void {
    if (!this.newNoteBody.trim() || this.isSending()) return;
    this.isSending.set(true);
    const activeId = this.noteService.activeCategoryId();
    
    this.noteService.createNote(activeId, '', this.newNoteBody, 'TEXT').subscribe({
      next: () => {
        this.newNoteBody = '';
        this.isSending.set(false);
      },
      error: () => {
        this.isSending.set(false);
      }
    });
  }

  deleteNote(id: string): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.noteContextMenuOpen.set(false);
        this.noteToEdit = null;
      }
    });
  }

  onNoteContextMenu(event: MouseEvent, note: Note): void {
    event.preventDefault();
    this.openNoteMenu(event.clientX, event.clientY, note);
  }

  onNoteOptionsClick(event: MouseEvent, note: Note): void {
    event.stopPropagation();
    this.openNoteMenu(event.clientX, event.clientY, note);
  }

  private openNoteMenu(x: number, y: number, note: Note): void {
    const menuWidth = 170;
    const adjustedX = Math.max(4, x - menuWidth);
    this.noteContextMenuPosition = { x: adjustedX, y };
    this.noteToEdit = note;
    this.noteContextMenuOpen.set(true);
    this.contextMenuOpen.set(false);
  }

  openEditNoteModal(): void {
    if (!this.noteToEdit) return;
    this.editNoteBody = this.noteToEdit.body;
    this.showEditNoteModal.set(true);
    this.noteContextMenuOpen.set(false);
  }

  executeEditNote(): void {
    if (!this.noteToEdit || !this.editNoteBody.trim()) return;
    this.noteService.updateNote(this.noteToEdit.id, this.noteToEdit.categoryId, this.noteToEdit.title, this.editNoteBody).subscribe({
      next: () => {
        this.showEditNoteModal.set(false);
        this.noteToEdit = null;
      }
    });
  }

  openMultiSelectModal(action: 'copy' | 'move'): void {
    this.multiSelectAction.set(action);
    this.selectedCategories.clear();
    this.showMultiSelectModal.set(true);
    this.noteContextMenuOpen.set(false);
  }

  toggleCategorySelection(id: number | null): void {
    if (this.selectedCategories.has(id)) {
      this.selectedCategories.delete(id);
    } else {
      this.selectedCategories.add(id);
    }
  }

  executeMultiSelectAction(): void {
    if (!this.noteToEdit || this.selectedCategories.size === 0) return;
    let catIds = Array.from(this.selectedCategories);
    
    // Si es mover, y se seleccionó la categoría actual (que causaría un bug en el backend donde se borra),
    // la ignoramos para la lista. Si solo se seleccionó la actual, no hacemos nada y cerramos el modal.
    if (this.multiSelectAction() === 'move') {
      const currentCatId = this.noteToEdit.categoryId;
      if (catIds.includes(currentCatId)) {
        catIds = catIds.filter(id => id !== currentCatId);
      }
      if (catIds.length === 0) {
        this.showMultiSelectModal.set(false);
        this.noteToEdit = null;
        return;
      }
    }

    const request$ = this.multiSelectAction() === 'copy'
      ? this.noteService.copyToCategories(this.noteToEdit.id, catIds, this.noteToEdit.title, this.noteToEdit.body, this.noteToEdit.noteType)
      : this.noteService.moveToCategories(this.noteToEdit.id, catIds, this.noteToEdit.title, this.noteToEdit.body, this.noteToEdit.noteType);

    request$.subscribe({
      next: () => {
        this.showMultiSelectModal.set(false);
        this.noteToEdit = null;
      },
      error: (err) => {
        console.error('Action failed', err);
        // Cerramos el modal de todas formas para no bloquear al usuario
        this.showMultiSelectModal.set(false);
        this.noteToEdit = null;
      }
    });
  }
}
