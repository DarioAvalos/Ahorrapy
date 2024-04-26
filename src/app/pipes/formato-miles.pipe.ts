import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMiles'
})
export class FormatoMilesPipe implements PipeTransform {

  transform(value: string | number): string {
    // Verificamos si el valor es numérico y lo convertimos a cadena de texto
    const stringValue = typeof value === 'number' ? value.toLocaleString('es-PY') : value;
    // Aplicamos el formato de miles
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}

