import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.el.nativeElement.value;
    let formattedValue = initialValue
                          .replace(/[^\d,]/g, '') // Remueve todo lo que no sea número o coma
                          .replace(/,/g, (match, offset, str) => offset === 0 ? match : ''); // Remueve comas adicionales
    // Formatea los miles
    const parts = formattedValue.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedValue = parts.join(',');
    this.el.nativeElement.value = formattedValue;
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}