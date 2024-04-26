import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      monto: ['', Validators.required]
    });
  }

  guardarRegistro() {
    if (this.registroForm.valid) {
      const monto = parseFloat(this.registroForm.value.monto.replace(/\./g, '').replace(',', '.'));
      const fecha = new Date().toISOString();
      this.registroService.restarMonto(monto, fecha);
      this.registroForm.reset();
    } else {
      console.log("Por favor completa todos los campos");
    }
  }

}

