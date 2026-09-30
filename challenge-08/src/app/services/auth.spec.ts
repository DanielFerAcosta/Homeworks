import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly validEmail = 'user@mail.com';
  private readonly validPassword = '123';

  private readonly loggedInSignal = signal(false);
  private readonly userEmailSignal = signal<string | null>(null);

  readonly isLoggedIn = this.loggedInSignal.asReadonly();
  readonly currentUser = this.userEmailSignal.asReadonly();

  readonly username = computed(() => {
    const email = this.userEmailSignal();

    return email ? email.split('@')[0] : '';
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('challenge08_user');

      if (savedUser) {
        this.loggedInSignal.set(true);
        this.userEmailSignal.set(savedUser);
      }
    }
  }

  login(email: string, password: string): boolean {
    const validEmail = email.trim().toLowerCase() === this.validEmail;
    const validPassword = password === this.validPassword;

    if (!validEmail || !validPassword) {
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();

    this.loggedInSignal.set(true);
    this.userEmailSignal.set(normalizedEmail);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('challenge08_user', normalizedEmail);
    }

    return true;
  }

  logout(): void {
    this.loggedInSignal.set(false);
    this.userEmailSignal.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('challenge08_user');
    }
  }
}