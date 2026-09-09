import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ClinicaService } from './services/clinica.service';
import { Paciente } from './models/paciente';
import { Medico } from './models/medico';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App implements OnDestroy {

  // Datos del formulario
  nombre = '';
  edad: number | null = null;
  motivo = '';

  // Pacientes
  pacientes: Paciente[] = [];
  historial: Paciente[] = [];

  // Médicos
  medicoActual: Medico | null = null;
  medicos: Medico[] = [];

  // Comité administrativo
  comite: string[] = [];
  miembroComiteActual = '';

  // Mensajes
  mensaje = '';

  // Temporizador para cambiar médico
  private intervalo: any;


  constructor(private clinica: ClinicaService) {

    // Cargar los datos iniciales
    this.actualizarDatos();

    // Cambiar médico automáticamente cada 10 segundos
    this.intervalo = setInterval(() => {
      this.cambiarMedicoAutomaticamente();
    }, 10000);
  }


  // ==========================================
  // PACIENTES
  // ==========================================

  agregarPaciente(): void {

    if (
      this.nombre.trim() === '' ||
      this.edad === null ||
      this.motivo.trim() === ''
    ) {

      this.mensaje = 'Debe completar todos los campos.';

      return;
    }

    const nuevoPaciente: Paciente = {

      id: Date.now(),

      nombre: this.nombre,

      edad: this.edad,

      motivo: this.motivo
    };

    this.clinica.agregarPaciente(nuevoPaciente);

    // Limpiar formulario
    this.nombre = '';
    this.edad = null;
    this.motivo = '';

    this.mensaje = 'Paciente agregado correctamente.';

    this.actualizarDatos();
  }


  atenderPaciente(): void {

    const paciente = this.clinica.atenderPaciente();

    if (paciente === null) {

      this.mensaje = 'No hay pacientes en espera.';

      return;
    }

    this.mensaje =
      'Paciente atendido: ' + paciente.nombre;

    this.actualizarDatos();
  }


  // ==========================================
  // MÉDICOS
  // ==========================================

  cambiarMedicoAutomaticamente(): void {

    const medico = this.clinica.cambiarMedico();

    if (medico !== null) {

      this.medicoActual = medico;
    }

    this.actualizarDatos();
  }


  // ==========================================
  // COMITÉ ADMINISTRATIVO
  // ==========================================

  siguienteComite(): void {

    const miembro = this.clinica.siguienteComite();

    if (miembro !== null) {

      this.miembroComiteActual = miembro;
    }

    this.actualizarDatos();
  }


  anteriorComite(): void {

    const miembro = this.clinica.anteriorComite();

    if (miembro !== null) {

      this.miembroComiteActual = miembro;
    }

    this.actualizarDatos();
  }


  // ==========================================
  // ACTUALIZAR INFORMACIÓN
  // ==========================================

  actualizarDatos(): void {

    this.pacientes =
      this.clinica.obtenerPacientes();

    this.historial =
      this.clinica.obtenerHistorial();

    this.medicos =
      this.clinica.obtenerMedicos();

    this.medicoActual =
      this.clinica.obtenerMedicoActual();

    this.comite =
      this.clinica.obtenerComite();

    // Seleccionar el primer miembro del comité
    if (
      this.comite.length > 0 &&
      this.miembroComiteActual === ''
    ) {

      this.miembroComiteActual =
        this.comite[0];
    }
  }


  // ==========================================
  // DESTRUIR TEMPORIZADOR
  // ==========================================

  ngOnDestroy(): void {

    if (this.intervalo) {

      clearInterval(this.intervalo);
    }
  }

}