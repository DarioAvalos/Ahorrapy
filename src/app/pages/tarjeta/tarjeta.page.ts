import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  cuentaForm : FormGroup

  tarjeta: number;

  monto: string;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
  }


  ngOnInit() {

    this.cuentaForm = this.formBuilder.group({
      tipo : ['tarjeta',[
        Validators.required]
      ],
      valor : ['',[
        Validators.required]
      ],
      moneda : ['GS',[
          Validators.required]
      ]
    });

    const storedValue = localStorage.getItem('tarjeta');
    if (storedValue) {
      this.monto = storedValue;
    }else {
      this.monto = '0'
    }

  }

  formatInput(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.tarjeta = value;
    localStorage.setItem('tarjeta', this.tarjeta.toString());
  }

  
  async guardarCuenta() {
    if (this.cuentaForm.valid) {
      localStorage.setItem('cuentaT', JSON.stringify(this.cuentaForm.value));
      this.router.navigate(['/cuentas']);
    } else {
      console.log("Por favor completa todos los campos");

      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Por favor completa todos los campos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
