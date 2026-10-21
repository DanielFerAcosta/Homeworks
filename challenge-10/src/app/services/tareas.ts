import { Injectable, inject } from '@angular/core';

import { Tarea } from '../models/tarea';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private readonly supabase = inject(SupabaseService).client;

  async listar(): Promise<Tarea[]> {
    const { data, error } = await this.supabase
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []) as Tarea[];
  }

  async crear(titulo: string): Promise<void> {
    const tituloLimpio = titulo.trim();

    if (!tituloLimpio) {
      throw new Error('Escribe el título de la tarea.');
    }

    const { error } = await this.supabase
      .from('tareas')
      .insert({
        titulo: tituloLimpio
      });

    if (error) {
      throw error;
    }
  }

  async actualizar(
    id: number,
    cambios: Partial<Pick<Tarea, 'titulo' | 'completada'>>
  ): Promise<void> {
    const { error } = await this.supabase
      .from('tareas')
      .update(cambios)
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw error;
    }
  }

  async eliminar(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('tareas')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw error;
    }
  }
}