import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './acceso.html',
  styleUrl: './acceso.scss'
})
export class Acceso {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly registro = signal(false);
  readonly enviando = signal(false);
  readonly error = signal('');
  readonly mensaje = signal('');

  correo = '';
  clave = '';
  confirmacion = '';

  constructor() {
    this.route.data.subscribe(datos => {
      this.registro.set(datos['registro'] === true);

      this.error.set('');
      this.mensaje.set('');

      this.clave = '';
      this.confirmacion = '';
    });
  }

  async enviar(): Promise<void> {
    if (this.enviando()) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    if (!this.correo.trim() || !this.clave) {
      this.error.set('Completa todos los campos.');
      return;
    }

    if (this.registro() && this.clave.length < 6) {
      this.error.set(
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    if (this.registro() && this.clave !== this.confirmacion) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.enviando.set(true);

    try {
      if (this.registro()) {
        const conSesion = await this.auth.registrar(
          this.correo,
          this.clave
        );

        if (!conSesion) {
          this.mensaje.set(
            'Solicitud de registro recibida. Revisa tu correo ' +
            'para confirmar la cuenta y después inicia sesión.'
          );

          this.clave = '';
          this.confirmacion = '';

          return;
        }
      } else {
        await this.auth.ingresar(this.correo, this.clave);
      }

      await this.router.navigateByUrl('/tareas');
    } catch (error: unknown) {
      this.error.set(this.obtenerMensaje(error));
    } finally {
      this.enviando.set(false);
    }
  }

  private obtenerMensaje(error: unknown): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      return error.message;
    }

    return 'No se pudo completar la operación.';
  }
}