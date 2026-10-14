import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ArbolNArio } from '../../models/arbol';
import { NodoGuardado, TipoNodo } from '../../models/nodo';
import { Autenticacion } from '../../services/autenticacion';
import { Nodos } from '../../services/nodos';

@Component({
  selector: 'app-explorador',
  imports: [FormsModule],
  templateUrl: './explorador.html',
  styleUrl: './explorador.scss'
})
export class Explorador implements OnInit {
  readonly auth = inject(Autenticacion);
  private readonly servicioNodos = inject(Nodos);
  private readonly router = inject(Router);

  readonly nodos = signal<NodoGuardado[]>([]);
  readonly arbol = computed(() => ArbolNArio.desdeLista(this.nodos()));
  readonly filas = computed(() => this.arbol().aplanar());

  readonly seleccionadoId = signal('raiz');
  readonly seleccionado = computed(
    () => this.arbol().buscar(this.seleccionadoId())
  );

  readonly cargando = signal(true);
  readonly guardando = signal(false);
  readonly error = signal('');
  readonly mensaje = signal('');

  nombre = '';
  tipo: TipoNodo = 'carpeta';

  async ngOnInit(): Promise<void> {
    try {
      this.nodos.set(await this.servicioNodos.listar());
    } catch (error: unknown) {
      this.mostrarError(error);
    } finally {
      this.cargando.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/login');
  }

  seleccionar(id: string): void {
    this.seleccionadoId.set(id);
    this.error.set('');
    this.mensaje.set('');
  }

  async crear(): Promise<void> {
    if (this.guardando()) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    try {
      const correo = this.auth.exigirCorreo();
      const padreId = this.seleccionadoId();

      this.arbol().validarHijo(padreId, this.nombre);

      this.guardando.set(true);

      const nuevo = await this.servicioNodos.crear({
        nombre: this.nombre.trim(),
        tipo: this.tipo,
        padreId,
        correoCreador: correo
      });

      this.nodos.update(lista => [...lista, nuevo]);
      this.nombre = '';
      this.mensaje.set('Elemento creado y guardado.');
    } catch (error: unknown) {
      this.mostrarError(error);
    } finally {
      this.guardando.set(false);
    }
  }

  private mostrarError(error: unknown): void {
    this.error.set(
      error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
    );
  }
}