import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  cuentaForm : FormGroup

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.cuentaForm = this.formBuilder.group({
      tipo : ['tarjeta',[
        Validators.required
      ]
      ],
      valor : ['',[
        Validators.required]
      ],
      moneda : ['GS',[
          Validators.required]
        ]
    });

  }

  guardarCuenta() {
    if (this.cuentaForm.valid) {
      localStorage.setItem('cuentaT', JSON.stringify(this.cuentaForm.value));
      this.router.navigate(['/cuentas']);
    } else {
      console.log("Por favor completa todos los campos");
    }
  }

}
