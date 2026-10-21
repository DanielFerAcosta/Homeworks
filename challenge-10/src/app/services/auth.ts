import { Injectable, inject, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';

import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly supabase = inject(SupabaseService).client;

  private readonly usuarioActual = signal<User | null>(null);

  readonly usuario = this.usuarioActual.asReadonly();

  readonly listo: Promise<void>;

  constructor() {
    this.supabase.auth.onAuthStateChange((_evento, sesion) => {
      this.usuarioActual.set(sesion?.user ?? null);
    });

    this.listo = this.restaurarSesion();
  }

  private async restaurarSesion(): Promise<void> {
    try {
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        this.usuarioActual.set(null);
        return;
      }

      this.usuarioActual.set(data.session?.user ?? null);
    } catch {
      this.usuarioActual.set(null);
    }
  }

  async registrar(correo: string, clave: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.signUp({
      email: correo.trim(),
      password: clave
    });

    if (error) {
      throw error;
    }

    this.usuarioActual.set(data.session?.user ?? null);

    return data.session !== null;
  }

  async ingresar(correo: string, clave: string): Promise<void> {
    const { data, error } =
      await this.supabase.auth.signInWithPassword({
        email: correo.trim(),
        password: clave
      });

    if (error) {
      throw error;
    }

    this.usuarioActual.set(data.user);
  }

  async salir(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }

    this.usuarioActual.set(null);
  }
}