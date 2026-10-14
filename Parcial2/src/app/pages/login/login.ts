import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Autenticacion } from '../../services/autenticacion';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly auth = inject(Autenticacion);
  private readonly router = inject(Router);

  correo = '';
  clave = '';

  readonly enviando = signal(false);
  readonly error = signal('');

  async ingresar(): Promise<void> {
    if (this.enviando()) {
      return;
    }

    this.error.set('');
    this.enviando.set(true);

    try {
      await this.auth.login(this.correo, this.clave);
      await this.router.navigate(['/explorador']);
    } catch (error: unknown) {
      this.error.set(
        error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
      );
    } finally {
      this.enviando.set(false);
    }
  }
}