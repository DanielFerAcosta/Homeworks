import { Injectable } from '@angular/core';

import { Paciente } from '../models/paciente';
import { Medico } from '../models/medico';

import { ListaSimple } from '../estructuras/lista-simple';
import { ListaDoble } from '../estructuras/lista-doble';
import { ListaCircular } from '../estructuras/lista-circular';
import { ListaCircularDoble } from '../estructuras/lista-circular-doble';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  pacientes = new ListaSimple<Paciente>();

  historial = new ListaDoble<Paciente>();

  medicos = new ListaCircular<Medico>();

  comite = new ListaCircularDoble<string>();

  constructor() {
    this.cargarDatosIniciales();
  }

  private cargarDatosIniciales(): void {

    this.medicos.insertar({
      id: 1,
      nombre: 'Carlos Gómez',
      especialidad: 'Medicina general'
    });

    this.medicos.insertar({
      id: 2,
      nombre: 'Laura Martínez',
      especialidad: 'Pediatría'
    });

    this.medicos.insertar({
      id: 3,
      nombre: 'Andrés Rodríguez',
      especialidad: 'Urgencias'
    });

    this.comite.insertar('Director médico');
    this.comite.insertar('Administrador');
    this.comite.insertar('Jefe de enfermería');

    this.agregarPaciente({
      id: 1,
      nombre: 'Juan Pérez',
      edad: 25,
      motivo: 'Dolor abdominal'
    });

    this.agregarPaciente({
      id: 2,
      nombre: 'María López',
      edad: 31,
      motivo: 'Dolor de cabeza'
    });

    this.agregarPaciente({
      id: 3,
      nombre: 'Pedro Sánchez',
      edad: 42,
      motivo: 'Fiebre'
    });
  }

  agregarPaciente(paciente: Paciente): void {
    this.pacientes.insertar(paciente);
  }

  atenderPaciente(): Paciente | null {
    const paciente = this.pacientes.eliminarPrimero();

    if (paciente !== null) {
      this.historial.insertar(paciente);
    }

    return paciente;
  }

  cambiarMedico(): Medico | null {
    return this.medicos.siguiente();
  }

  obtenerPacientes(): Paciente[] {
    return this.pacientes.obtenerTodos();
  }

  obtenerHistorial(): Paciente[] {
    return this.historial.obtenerTodos();
  }

  obtenerHistorialInverso(): Paciente[] {
    return this.historial.obtenerTodosInverso();
  }

  obtenerMedicos(): Medico[] {
    return this.medicos.obtenerTodos();
  }

  obtenerMedicoActual(): Medico | null {
    return this.medicos.obtenerActual();
  }

  obtenerComite(): string[] {
    return this.comite.obtenerTodos();
  }

  siguienteComite(): string | null {
    return this.comite.siguiente();
  }

  anteriorComite(): string | null {
    return this.comite.anterior();
  }
}