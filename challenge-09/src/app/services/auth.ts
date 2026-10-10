import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User
} from 'firebase/auth';

import { firebaseAuth } from '../../firebase/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly userSignal = signal<User | null>(null);
  private readonly loadingSignal = signal(true);

  readonly currentUser = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  readonly isLoggedIn = computed(() => {
    return this.userSignal() !== null;
  });

  readonly username = computed(() => {
    const user = this.userSignal();

    return user?.displayName
      || user?.email?.split('@')[0]
      || '';
  });

  readonly email = computed(() => {
    return this.userSignal()?.email ?? '';
  });

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      this.loadingSignal.set(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        this.userSignal.set(user);
        this.loadingSignal.set(false);
      },
      (error) => {
        console.error('Error al observar la sesión:', error);

        this.userSignal.set(null);
        this.loadingSignal.set(false);
      }
    );

    this.destroyRef.onDestroy(unsubscribe);
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email.trim(),
      password
    );

    await updateProfile(credential.user, {
      displayName: name.trim()
    });

    this.userSignal.set(credential.user);
  }

  async login(
    email: string,
    password: string
  ): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      email.trim(),
      password
    );

    this.userSignal.set(credential.user);
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);

    this.userSignal.set(null);
  }

  async waitForSession(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    await firebaseAuth.authStateReady();

    this.userSignal.set(firebaseAuth.currentUser);
    this.loadingSignal.set(false);
  }
}