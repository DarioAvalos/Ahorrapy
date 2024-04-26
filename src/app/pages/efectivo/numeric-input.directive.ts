import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appNumericInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericInputDirective),
      multi: true
    }
  ]
})
export class NumericInputDirective implements ControlValueAccessor {

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
    this.onChange(formattedValue);
    event.stopPropagation();
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}