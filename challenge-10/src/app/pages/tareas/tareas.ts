import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  RealtimeChannel,
  SupabaseClient
} from '@supabase/supabase-js';

import { Tarea } from '../../models/tarea';

import { AuthService } from '../../services/auth';
import { TareasService } from '../../services/tareas';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss'
})
export class Tareas implements OnInit, OnDestroy {
  readonly auth = inject(AuthService);

  private readonly servicio = inject(TareasService);
  private readonly router = inject(Router);

  private readonly supabase: SupabaseClient =
    inject(SupabaseService).client;

  readonly lista = signal<Tarea[]>([]);
  readonly cargando = signal(true);
  readonly ocupado = signal(false);
  readonly error = signal('');
  readonly conectado = signal(false);

  readonly pendientes = computed(
    () => this.lista().filter(tarea => !tarea.completada).length
  );

  readonly editandoId = signal<number | null>(null);

  titulo = '';
  tituloEdicion = '';

  private canal?: RealtimeChannel;
  private consulta = 0;
  private destruido = false;

  ngOnInit(): void {
    this.canal = this.supabase
      .channel(`tareas-${crypto.randomUUID()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas'
        },
        () => {
          void this.cargar();
        }
      )
      .subscribe(estado => {
        if (this.destruido) {
          return;
        }

        this.conectado.set(estado === 'SUBSCRIBED');

        if (estado === 'SUBSCRIBED') {
          void this.cargar();
        }
      });

    void this.cargar();
  }

  ngOnDestroy(): void {
    this.destruido = true;
    this.consulta++;

    if (this.canal) {
      void this.supabase.removeChannel(this.canal);
    }
  }

  async cargar(): Promise<void> {
    const numero = ++this.consulta;

    try {
      const datos = await this.servicio.listar();

      if (!this.destruido && numero === this.consulta) {
        this.lista.set(datos);
      }
    } catch (error: unknown) {
      if (!this.destruido && numero === this.consulta) {
        this.mostrarError(error);
      }
    } finally {
      if (!this.destruido && numero === this.consulta) {
        this.cargando.set(false);
      }
    }
  }

  async crear(): Promise<void> {
    if (!this.titulo.trim() || this.ocupado()) {
      return;
    }

    await this.ejecutar(async () => {
      await this.servicio.crear(this.titulo);
      this.titulo = '';
    });
  }

  empezarEdicion(tarea: Tarea): void {
    this.editandoId.set(tarea.id);
    this.tituloEdicion = tarea.titulo;
    this.error.set('');
  }

  cancelarEdicion(): void {
    this.editandoId.set(null);
    this.tituloEdicion = '';
  }

  async guardarEdicion(): Promise<void> {
    const id = this.editandoId();

    if (id === null || !this.tituloEdicion.trim()) {
      return;
    }

    await this.ejecutar(async () => {
      await this.servicio.actualizar(id, {
        titulo: this.tituloEdicion.trim()
      });

      this.cancelarEdicion();
    });
  }

  async alternar(tarea: Tarea): Promise<void> {
    await this.ejecutar(() =>
      this.servicio.actualizar(tarea.id, {
        completada: !tarea.completada
      })
    );
  }

  async eliminar(tarea: Tarea): Promise<void> {
    if (this.ocupado()) {
      return;
    }

    if (!window.confirm(`¿Eliminar "${tarea.titulo}"?`)) {
      return;
    }

    await this.ejecutar(async () => {
      await this.servicio.eliminar(tarea.id);

      if (this.editandoId() === tarea.id) {
        this.cancelarEdicion();
      }
    });
  }

  async salir(): Promise<void> {
    await this.ejecutar(async () => {
      await this.auth.salir();
      await this.router.navigateByUrl('/login');
    }, false);
  }

  private async ejecutar(
    accion: () => Promise<void>,
    refrescar = true
  ): Promise<void> {
    if (this.ocupado()) {
      return;
    }

    this.ocupado.set(true);
    this.error.set('');

    try {
      await accion();

      if (refrescar) {
        await this.cargar();
      }
    } catch (error: unknown) {
      this.mostrarError(error);
    } finally {
      this.ocupado.set(false);
    }
  }

  private mostrarError(error: unknown): void {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      this.error.set(error.message);
      return;
    }

    this.error.set('No se pudo completar la operación.');
  }
}