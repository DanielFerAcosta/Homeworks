import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.sass'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';

  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  async login(): Promise<void> {
    if (this.submitting()) {
      return;
    }

    this.errorMessage.set('');

    if (!this.email.trim() || !this.password) {
      this.errorMessage.set('Ingresa el correo y la contraseña.');
      return;
    }

    this.submitting.set(true);

    try {
      await this.authService.login(this.email, this.password);

      await this.router.navigate(['/tasks']);
    } catch (error: unknown) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.submitting.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (!(error instanceof FirebaseError)) {
      return 'Ocurrió un error inesperado. Intenta nuevamente.';
    }

    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'El correo o la contraseña son incorrectos.';

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/user-disabled':
        return 'Esta cuenta está deshabilitada.';

      case 'auth/too-many-requests':
        return 'Demasiados intentos. Espera antes de volver a intentar.';

      case 'auth/network-request-failed':
        return 'No se pudo conectar. Revisa tu conexión a internet.';

      case 'auth/operation-not-allowed':
        return 'Debes habilitar Email/Password en Firebase Authentication.';

      default:
        return 'No se pudo iniciar sesión. Intenta nuevamente.';
    }
  }
}