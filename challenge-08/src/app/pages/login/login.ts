import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.spec';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  login(): void {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Debes ingresar el correo y la contraseña.';
      return;
    }

    const isValidUser = this.authService.login(
      this.email,
      this.password
    );

    if (!isValidUser) {
      this.errorMessage =
        'Credenciales incorrectas. Usa user@mail.com y contraseña 123.';
      return;
    }

    this.router.navigate(['/dashboard']);
  }
}