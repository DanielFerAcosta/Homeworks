import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.sass'
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  async register(): Promise<void> {
    if (this.submitting()) {
      return;
    }

    this.errorMessage.set('');

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set(
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.submitting.set(true);

    try {
      await this.authService.register(
        this.name,
        this.email,
        this.password
      );

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
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con ese correo. Inicia sesión.';

      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';

      case 'auth/weak-password':
      case 'auth/password-does-not-meet-requirements':
        return 'La contraseña no cumple los requisitos de seguridad.';

      case 'auth/network-request-failed':
        return 'No se pudo conectar. Revisa tu conexión a internet.';

      case 'auth/operation-not-allowed':
        return 'Debes habilitar Email/Password en Firebase Authentication.';

      case 'auth/too-many-requests':
        return 'Demasiados intentos. Espera antes de volver a intentar.';

      default:
        return 'No se pudo completar el registro. Intenta nuevamente.';
    }
  }
}