import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Función regular
  verificarNumero(numero: number): void {
    if (numero % 2 === 0) {
      console.log(`El número ${numero} es PAR`);
    } else {
      console.log(`El número ${numero} es IMPAR`);
    }
  }

  // Función Arrow
  verificarNumeroArrow = (numero: number): void => {
    if (numero % 2 === 0) {
      console.log(`El número ${numero} es PAR`);
    } else {
      console.log(`El número ${numero} es IMPAR`);
    }
  };
}
