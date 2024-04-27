import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  registroForm: FormGroup;

  tuModelo: number;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      monto: ['', Validators.required]
    });
  }

  formatInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.tuModelo = value;
  }

  async guardarRegistro() {
    if (this.registroForm.valid) {
      const monto = parseFloat(this.registroForm.value.monto.replace(/\./g, '').replace(',', '.'));
      const fecha = new Date().toISOString();
      this.registroService.restarMonto(monto, fecha);
      this.registroForm.reset();
      this.router.navigate(['/home'])
    } else {
      console.log("Por favor completa todos los campos");

      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Ingresa un monto para guardar',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}

